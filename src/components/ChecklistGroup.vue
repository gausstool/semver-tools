<script setup lang="ts">
import type { CheckGroup } from '../data/checkItems'

defineProps<{
  group: CheckGroup
}>()

const emit = defineEmits<{
  'item-click': [itemIndex: number]
}>()

function handleItemClick(itemIndex: number) {
  emit('item-click', itemIndex)
}
</script>

<template>
  <div class="checklist-group" :class="group.level">
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
      <div
        v-for="(item, index) in group.items"
        :key="index"
        class="check-item"
        :class="{ checked: item.checked }"
        @click="handleItemClick(index)"
      >
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
</template>

<style scoped>
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
</style>