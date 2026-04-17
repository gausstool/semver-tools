# 语义化版本号工具

一个基于 Vue 3 + TypeScript 的语义化版本号生成工具，遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 规范。

## 功能特性

- 输入当前版本号，自动验证格式是否正确
- 根据选择的变更类型（major、minor、patch）自动计算新版本号
- 提供详细的变更类型选项，帮助用户正确选择版本变更级别
- 支持一键重置所有选项
- 响应式设计，界面美观易用

## 技术栈

- Vue 3 + TypeScript
- Vite
- CSS3

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式运行

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 预览生产构建

```bash
pnpm run preview
```

## 使用说明

1. 在「当前版本号」输入框中输入你的当前版本号（例如：1.0.0）
2. 在下方的变更类型列表中，根据你的变更内容选择相应的选项
3. 系统会自动根据你的选择计算出「新版本号」
4. 如果需要重新选择，可以点击「重置所有选项」按钮

## 版本变更规则

- **Major**：当你做了不兼容的 API 修改
- **Minor**：当你添加了向后兼容的新功能
- **Patch**：当你做了向后兼容的 bug 修复

## 项目结构

```
semver-tools/
├── public/           # 静态资源
├── scripts/          # 脚本文件
├── shells/           # Shell 脚本
├── src/              # 源代码
│   ├── data/         # 数据文件
│   ├── types/        # TypeScript 类型定义
│   ├── utils/        # 工具函数
│   ├── App.vue       # 主应用组件
│   ├── main.ts       # 应用入口
│   └── style.css     # 全局样式
├── .env              # 环境变量
├── .env.example      # 环境变量示例
├── .gitignore        # Git 忽略文件
├── LICENSE           # 许可证
├── index.html        # HTML 入口
├── package.json      # 项目配置
├── tsconfig.json     # TypeScript 配置
├── tsconfig.node.json # Node.js TypeScript 配置
└── vite.config.ts    # Vite 配置
```

## 贡献

欢迎提交 Issue 和 Pull Request 来改进这个工具！

## 许可证

MIT License
