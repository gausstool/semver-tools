<script setup lang="ts">
defineProps<{
  modelValue: string
}>()
</script>

<template>
  <div class="result-section">
    <div class="result-label">新版本号</div>
    <input class="version-input result" :value="modelValue" disabled />
  </div>
</template>

<style scoped>
.result-section {
  width: 400px;
}

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
</style>