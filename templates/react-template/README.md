# react-template

一个使用 React + TypeScript + Tailwind CSS + Aceternity UI 构建的现代化项目模板。

## 技术栈

- **React 18+** - UI 框架
- **TypeScript** - 类型安全
- **Vite 5+** - 构建工具和开发服务器
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Framer Motion** - 动画库 (Aceternity UI 核心)
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
react-template/
├── public/          # 静态资源目录
├── src/            # 源代码目录
│   ├── components/ # 组件目录
│   ├── lib/        # 工具函数目录
│   ├── App.tsx     # 根组件
│   └── main.tsx    # 入口文件
├── vite.config.ts  # Vite 配置
├── tailwind.config.js # Tailwind 配置
├── tsconfig.json   # TypeScript 配置
└── package.json    # 项目配置
```

## 路径别名

项目配置了 `@` 别名指向 `src` 目录，你可以这样使用：

```typescript
import Component from '@/components/Component'
import { utils } from '@/lib/utils'
```

## 许可证

MIT

