<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleClick() {
  emit('update:modelValue', true)
}
</script>

<template>
  <div class="setting-section">
    <label class="input-label">设置</label>
    <button class="reset-btn" :disabled="!modelValue" @click="handleClick">
      重置
    </button>
  </div>
</template>

<style scoped>
.setting-section {
  width: 400px;
}

.input-label {
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
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

.reset-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>