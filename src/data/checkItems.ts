import type { CheckItem } from '../types'

export interface CheckGroup {
  title: string
  level: 'major' | 'minor' | 'patch'
  items: CheckItem[]
}

const majorChecks: CheckItem[] = [
  { title: '重命名或删除 public 方法/类/接口', desc: '公共 API 发生不兼容修改', checked: false },
  { title: '修改方法签名', desc: '参数类型、返回值或参数数量发生变化', checked: false },
  { title: '更改默认行为或配置格式', desc: '影响现有功能的默认配置', checked: false },
  { title: '移除已标记为 deprecated 的 API', desc: '删除弃用的公共接口', checked: false },
  { title: '升级依赖的主版本号导致 API 变化', desc: '第三方依赖的不兼容升级', checked: false },
  { title: '任何不兼容的公共 API 修改', desc: 'MUST: 任何不兼容修改加入公共 API 时必须递增', checked: false },
]

const minorChecks: CheckItem[] = [
  { title: '新增向后兼容的公共 API', desc: '扩展现有接口或新增方法', checked: false },
  { title: '新增功能模块', desc: '添加新的功能组件', checked: false },
  { title: '公共 API 被标记为弃用 (deprecated)', desc: 'MUST: 功能被标记弃用时必须递增', checked: false },
  { title: '内部程序有大量新功能或改进', desc: 'MAY: 可在内部改进时递增', checked: false },
]
const patchChecks: CheckItem[] = [
  { title: '修复了某个 bug', desc: '修正已知问题', checked: false },
  { title: '修正了计算结果错误', desc: '修正不正确的结果', checked: false },
  { title: '修复了边界条件问题', desc: '修复极端情况下的异常', checked: false },
  { title: '仅做了内部实现的改进', desc: '不涉及 API 变化的内部优化', checked: false },
]

export const checkGroups: CheckGroup[] = [
  { title: '破坏性变更 (Breaking Changes)', level: 'major', items: majorChecks },
  { title: '新增功能 (New Features)', level: 'minor', items: minorChecks },
  { title: 'Bug 修复 (Bug Fixes)', level: 'patch', items: patchChecks },
]
