<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  parseVersion,
  validateVersionInput,
  bumpVersion,
  formatVersion,
  getVersionLevel,
} from './utils/version'
import { checkGroups } from './data/checkItems'
import type { VersionLevel } from './types'
import VersionInput from './components/VersionInput.vue'
import VersionResult from './components/VersionResult.vue'
import ResetButton from './components/ResetButton.vue'
import ChecklistGroup from './components/ChecklistGroup.vue'

const currentVersion = ref('1.0.0')
const inputError = ref('')
const changelog = ref('')

const modelData = ref(checkGroups)

const hasCheckedItems = computed(() => {
  return modelData.value.some((group) => group.items.some((item) => item.checked))
})

const parsedVersion = computed(() => {
  return parseVersion(currentVersion.value)
})

const versionLevel = computed<VersionLevel>(() => {
  const hasMajor = modelData.value
    .find((group) => group.level === 'major')
    ?.items.some((item) => item.checked)
  const hasMinor = modelData.value
    .find((group) => group.level === 'minor')
    ?.items.some((item) => item.checked)
  const hasPatch = modelData.value
    .find((group) => group.level === 'patch')
    ?.items.some((item) => item.checked)
  return getVersionLevel(hasMajor ?? false, hasMinor ?? false, hasPatch ?? false)
})

const newVersion = computed(() => {
  if (inputError.value || !parsedVersion.value) return '0.0.0'
  return formatVersion(bumpVersion(parsedVersion.value, versionLevel.value))
})

function resetAll() {
  modelData.value.forEach((group) => {
    group.items.forEach((item) => (item.checked = false))
  })
  changelog.value = ''
}

function toggleItem(groupIndex: number, itemIndex: number) {
  modelData.value[groupIndex].items[itemIndex].checked =
    !modelData.value[groupIndex].items[itemIndex].checked
}
</script>

<template>
  <div class="container">
    <h1 class="title">语义化版本号工具</h1>
    <p class="subtitle">Semantic Versioning 2.0.0 | RFC 2119</p>

    <div class="container-header">
      <GRow>
        <GCol :span="4"  :xs="12">
          <VersionInput
            :model-value="currentVersion"
            :error="inputError"
            @update:model-value="
              (val) => {
                currentVersion = val
                inputError = validateVersionInput(val)
              }
            "
          />
        </GCol>
        <GCol :span="4" :xs="12">
          <ResetButton :model-value="hasCheckedItems" @update:model-value="resetAll" />
        </GCol>
        <GCol :span="4" :xs="12">
          <VersionResult :model-value="newVersion" />
        </GCol>
      </GRow>
    </div>

    <div class="container-body">
      <GRow>
        <GCol
          :span="4"
          :xs="12"
          v-for="(group, groupIndex) in modelData"
          :key="group.level"
        >
          <ChecklistGroup
            :group="group"
            @item-click="(itemIndex) => toggleItem(groupIndex, itemIndex)"
          />
        </GCol>
      </GRow>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: white;
  padding: 20px 20px 0;
}

.title {
  text-align: center;
  color: #333;
  margin-bottom: 8px;
  font-size: 28px;
}

.subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 16px;
  font-size: 14px;
}

.container-header {
}

.container-body {
  padding-top: 22px;
  margin-bottom: 32px;
}
</style>
