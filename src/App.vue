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
import type { CheckItem, VersionLevel } from "./types";

const currentVersion = ref("1.0.0");
const inputError = ref("");
const changelog = ref("");

const modelData = ref(checkGroups);

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

function handleInput() {
  inputError.value = validateVersionInput(currentVersion.value);
}

function toggleItem(item: CheckItem) {
  item.checked = !item.checked;
}

function resetAll() {
  modelData.value.forEach((group) => {
    group.items.forEach((item) => (item.checked = false));
  });
  changelog.value = "";
}
</script>

<template>
  <div class="container">
    <h1>语义化版本号工具</h1>
    <p class="subtitle">Semantic Versioning 2.0.0 | RFC 2119</p>

    <div class="container-header">
      <div class="header-section input-section">
        <label class="input-label">当前版本号</label>
        <div>
          <input type="text" class="version-input" :class="{ error: inputError }" v-model="currentVersion"
            @input="handleInput" placeholder="例如: 1.2.3" />
          <p v-if="inputError" class="error-hint">{{ inputError }}</p>
        </div>
      </div>
      <div class="header-section setting-section">
        <label class="input-label">设置</label>
        <button class="reset-btn" @click="resetAll">重置</button>
      </div>
      <div class="header-section result-section">
        <div class="result-label">新版本号</div>
        <input class="version-input result" v-model="newVersion" disabled></input>
      </div>
    </div>

    <div class="container-body">
      <div v-for="group in modelData" :key="group.level" class="checklist-group" :class="group.level">
        <div class="group-header" :class="group.level">
          <span>
            {{ group.title }}
            <span v-if="group.level === 'major'" class="rfc-keyword must">MUST</span>
            <span v-if="group.level === 'minor'" class="rfc-keyword must">MUST</span>
            <span v-if="group.level === 'minor'" class="rfc-keyword may">MAY</span>
            <span v-if="group.level === 'patch'" class="rfc-keyword must">MUST</span>
          </span>
          <span class="group-tag">{{ group.level }}</span>
        </div>
        <div class="checklist">
          <div v-for="(item, index) in group.items" :key="index" class="check-item" :class="{ checked: item.checked }"
            @click="toggleItem(item)">
            <div class="checkbox">
              <span v-if="item.checked" class="check-icon">✓</span>
            </div>
            <div class="check-content">
              <div class="check-title">{{ item.title }}</div>
              <div class="check-desc">{{ item.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: white;
  padding: 20px 20px 0;

  --color-red-0: #fff1f0;
  --color-red-1: #ffccc7;
  --color-red-2: #ffa39e;
  --color-red-4: #ff4d4f;

  --color-green-0: #f6ffed;
  --color-green-1: #d9f7be;
  --color-green-2: #b7eb8f;
  --color-green-4: #73d13d;

  --color-blue-0: #e6f4ff;
  --color-blue-1: #bae0ff;
  --color-blue-2: #91caff;
  --color-blue-4: #4096ff;
}

h1 {
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

.header-section {
  width: 400px;
}

.input-label,
.result-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}

.version-input {
  box-sizing: border-box;
  padding: 14px 0;
  width: 100%;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  color: #333;
  transition: border-color 0.3s;
  border-color: #f0f0f0;
  color: #181818;
}

.version-input:focus {
  outline: none;
  border-color: #181818;
}


.version-input.error {
  border-color: #e74c3c;
}

.error-hint {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 2px;
  text-align: center;
  position: absolute;
}

.reset-btn {
  box-sizing: border-box;
  width: 100%;
  padding: 14px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
  color: #181818;
  border: 1px solid #f5f5ff;
}

.reset-btn:active {
  background-color: #f8f9fa;
}

.container-body {
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  gap: 24px;
  margin-bottom: 32px;
}

.checklist-group {
  width: 400px;
  border-radius: 12px;
  overflow: hidden;
}

.checklist-group.major {
  border: 2px solid var(--color-red-2);
}

.checklist-group.minor {
  border: 2px solid var(--color-green-2);
}

.checklist-group.patch {
  border: 2px solid var(--color-blue-2);
}

.group-header {
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.group-header.major {
  background: var(--color-red-0);
  color: var(--color-red-4);
}

.group-header.minor {
  background: var(--color-green-0);
  color: var(--color-green-4);
}

.group-header.patch {
  background: var(--color-blue-0);
  color: var(--color-blue-4);
}

.group-tag {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  text-transform: uppercase;
}

.group-header.major .group-tag {
  background: var(--color-red-4);
  color: white;
}

.group-header.minor .group-tag {
  background: var(--color-green-4);
  color: white;
}

.group-header.patch .group-tag {
  background: var(--color-blue-4);
  color: white;
}

.checklist {
  display: flex;
  flex-direction: column;
}

.check-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  transition: background 0.2s;
  border-top: 1px solid #eee;
}

.check-item:hover {
  background: #f8f9fa;
}

.check-item:first-child {
  border-top: none;
}

.checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
  margin-top: 2px;
}

.checklist-group.major .check-item .checkbox {
  border-color: var(--color-red-4);
}

.checklist-group.minor .check-item .checkbox {
  border-color: var(--color-green-4);
}

.checklist-group.patch .check-item .checkbox {
  border-color: var(--color-blue-4);
}

.check-item.checked .checkbox {
  background: currentColor;
  border-color: currentColor;
}

.checklist-group.major .check-item.checked .checkbox {
  background: var(--color-red-4);
  border-color: var(--color-red-4);
}

.checklist-group.minor .check-item.checked .checkbox {
  background: var(--color-green-4);
  border-color: var(--color-green-4);
}

.checklist-group.patch .check-item.checked .checkbox {
  background: var(--color-blue-4);
  border-color: var(--color-blue-4);
}

.check-icon {
  color: white;
  font-size: 14px;
  font-weight: bold;
}

.check-content {
  flex: 1;
}

.check-title {
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
}

.check-desc {
  color: #666;
  font-size: 12px;
  line-height: 1.4;
}

.rfc-keyword {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  font-weight: 600;
  margin-left: 6px;
}

.rfc-keyword.must {
  background: var(--color-red-4);
  color: white;
}

.rfc-keyword.may {
  background: var(--color-blue-4);
  color: white;
}

@media screen and (max-width: 1280px) {
  .container-header,
  .container-body {
    flex-wrap: wrap;
    gap: 12px;
  }
  .header-section,
  .checklist-group {
    width: 100%;
  }
}
</style>
