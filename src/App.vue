<script setup lang="ts">
import { ref, computed } from "vue";
import {
  parseVersion,
  validateVersionInput,
  bumpVersion,
  formatVersion,
  getVersionLevel,
} from "./utils/version";
import { checkGroups } from "./data/checkItems";
import type { VersionLevel } from "./types";
import VersionInput from "./components/VersionInput.vue";
import VersionResult from "./components/VersionResult.vue";
import ResetButton from "./components/ResetButton.vue";
import ChecklistGroup from "./components/ChecklistGroup.vue";

const currentVersion = ref("1.0.0");
const inputError = ref("");
const changelog = ref("");

const modelData = ref(checkGroups);

const hasCheckedItems = computed(() => {
  return modelData.value.some((group) =>
    group.items.some((item) => item.checked)
  );
});

const parsedVersion = computed(() => {
  return parseVersion(currentVersion.value);
});

const versionLevel = computed<VersionLevel>(() => {
  const hasMajor = modelData.value
    .find((group) => group.level === "major")
    ?.items.some((item) => item.checked);
  const hasMinor = modelData.value
    .find((group) => group.level === "minor")
    ?.items.some((item) => item.checked);
  const hasPatch = modelData.value
    .find((group) => group.level === "patch")
    ?.items.some((item) => item.checked);
  return getVersionLevel(
    hasMajor ?? false,
    hasMinor ?? false,
    hasPatch ?? false,
  );
});

const newVersion = computed(() => {
  if (inputError.value || !parsedVersion.value) return "0.0.0";
  return formatVersion(bumpVersion(parsedVersion.value, versionLevel.value));
});

function resetAll() {
  modelData.value.forEach((group) => {
    group.items.forEach((item) => (item.checked = false));
  });
  changelog.value = "";
}

function toggleItem(groupIndex: number, itemIndex: number) {
  modelData.value[groupIndex].items[itemIndex].checked =
    !modelData.value[groupIndex].items[itemIndex].checked;
}
</script>

<template>
  <div class="container">
    <h1 class="title">语义化版本号工具</h1>
    <p class="subtitle">Semantic Versioning 2.0.0 | RFC 2119</p>

    <div class="container-header">
      <VersionInput
        :model-value="currentVersion"
        :error="inputError"
        @update:model-value="(val) => { currentVersion = val; inputError = validateVersionInput(val) }"
      />
      <ResetButton :model-value="hasCheckedItems" @update:model-value="resetAll" />
      <VersionResult :model-value="newVersion" />
    </div>

    <div class="container-body">
      <ChecklistGroup
        v-for="(group, groupIndex) in modelData"
        :key="group.level"
        :group="group"
        @item-click="(itemIndex) => toggleItem(groupIndex, itemIndex)"
      />
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
  display: flex;
  align-items: center;
  gap: 24px;
}

.container-body {
  display: flex;
  flex-direction: row;
  padding-top: 22px;
  gap: 24px;
  margin-bottom: 32px;
}

@media screen and (max-width: 1280px) {
  .container-header,
  .container-body {
    flex-wrap: wrap;
    gap: 16px;
  }
  :deep(.input-section),
  :deep(.result-section),
  :deep(.setting-section),
  .checklist-group {
    width: 100%;
  }
}
</style>