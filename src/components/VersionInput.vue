<script setup lang="ts">
defineProps<{
  modelValue: string
  error: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="input-section">
    <label class="input-label">当前版本号</label>
    <div>
      <input
        type="text"
        class="version-input"
        :class="{ error: error }"
        :value="modelValue"
        @input="handleInput"
        placeholder="例如: 1.2.3"
      />
      <p v-if="error" class="error-hint">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
.input-section {
  width: 400px;
}

.input-label {
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
</style>