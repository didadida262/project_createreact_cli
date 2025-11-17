# vue-template

一个使用 Vue 3 + TypeScript + Element Plus 构建的现代化项目模板。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全
- **Vite 5+** - 构建工具和开发服务器
- **Element Plus** - Vue 3 组件库
- **Vue Router** - 官方路由管理器
- **Pinia** - 状态管理
- **Tailwind CSS** - 实用优先的 CSS 框架
- **ESLint** - 代码检查工具
- **Prettier** - 代码格式化工具

## 开始使用

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn >= 1.22.0 或 pnpm >= 8.0.0

### 安装依赖

```bash
{{packageManager}} install
```

### 开发

```bash
{{packageManager}} run dev
```

项目将在 http://localhost:3000 启动

### 构建

```bash
{{packageManager}} run build
```

### 预览构建结果

```bash
{{packageManager}} run preview
```

### 代码检查

```bash
{{packageManager}} run lint
```

### 代码格式化

```bash
{{packageManager}} run format
```

### 类型检查

```bash
{{packageManager}} run type-check
```

## 项目结构

```
vue-template/
├── public/          # 静态资源目录
├── src/            # 源代码目录
│   ├── components/ # 组件目录
│   ├── views/      # 页面目录
│   ├── router/     # 路由配置
│   ├── stores/     # Pinia 状态管理
│   ├── App.vue     # 根组件
│   └── main.ts     # 入口文件
├── vite.config.ts  # Vite 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json   # TypeScript 配置
└── package.json    # 项目配置
```

## 路径别名

项目配置了 `@` 别名指向 `src` 目录，你可以这样使用：

```typescript
import Component from '@/components/Component'
import { useStore } from '@/stores/counter'
```

## Element Plus

项目已集成 Element Plus，支持自动导入组件和样式。

## 许可证

MIT

