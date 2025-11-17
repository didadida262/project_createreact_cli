# create-myapp-cli

一个用于快速创建干净、完善的 React/Vue 项目的 CLI 脚手架工具。

## ✨ 特性

- ⚡️ **快速开发** - 使用 Vite 5+ 作为构建工具，提供极速的开发体验
- 🎨 **开箱即用** - 预配置完善的开发环境（ESLint + Prettier + TypeScript）
- 📦 **多模板支持** - 支持 React 和 Vue 3 两种主流框架
- 🔧 **灵活配置** - 交互式选择包管理器、测试框架、E2E 测试、Git Hooks 等
- 🎯 **最佳实践** - 清晰的项目结构和代码规范
- 🚀 **现代化技术栈** - 使用最新的框架和工具

## 📋 系统要求

- Node.js >= 18.0.0
- npm >= 9.0.0 或 yarn 或 pnpm

## 🚀 快速开始

### 通过 npx 使用（推荐）

```bash
npx @miles_wang/create-myapp-cli my-app
```

### 使用步骤

1. **运行脚手架命令**
   ```bash
   npx create-myapp-cli my-app
   ```

2. **交互式配置**
   脚手架会引导你完成以下配置：
   - 📦 **项目模板**：选择 React 或 Vue 3
   - 📥 **包管理器**：选择 npm、yarn 或 pnpm
   - 🧪 **测试框架**：选择 Vitest、Jest 或不需要测试
   - 🎭 **E2E 测试**：是否包含 Playwright
   - 🪝 **Git Hooks**：是否包含 Husky + lint-staged

3. **安装依赖**
   ```bash
   cd my-app
   npm install  # 或 yarn install / pnpm install
   ```

4. **启动开发服务器**
   ```bash
   npm run dev  # 或 yarn dev / pnpm dev
   ```

## 📁 生成的项目结构

### React 模板结构

```
my-app/
├── public/                    # 静态资源目录
├── src/
│   ├── components/           # 组件目录
│   │   └── Welcome/         # 欢迎组件示例
│   ├── lib/                  # 工具函数
│   ├── App.tsx              # 根组件
│   ├── main.tsx             # 入口文件
│   ├── index.css            # 全局样式
│   └── vite-env.d.ts        # Vite 类型定义
├── index.html               # HTML 模板
├── .eslintrc.cjs            # ESLint 配置
├── .prettierrc               # Prettier 配置
├── .gitignore               # Git 忽略配置
├── .nvmrc                   # Node.js 版本
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── README.md                # 项目说明
```

### Vue 模板结构

```
my-app/
├── public/                    # 静态资源目录
├── src/
│   ├── components/           # 组件目录
│   │   └── Welcome/         # 欢迎组件示例
│   ├── views/               # 页面组件
│   │   └── Home.vue        # 首页示例
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── stores/              # Pinia 状态管理
│   │   └── counter.ts      # 示例 store
│   ├── App.vue              # 根组件
│   ├── main.ts              # 入口文件
│   ├── index.css            # 全局样式
│   └── vite-env.d.ts        # Vite 类型定义
├── index.html               # HTML 模板
├── .eslintrc.cjs            # ESLint 配置
├── .prettierrc               # Prettier 配置
├── .gitignore               # Git 忽略配置
├── .nvmrc                   # Node.js 版本
├── package.json             # 项目配置
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
├── tailwind.config.js       # Tailwind CSS 配置
└── README.md                # 项目说明
```

## 🛠️ 技术栈

### React 模板

**核心框架：**
- React 18+
- TypeScript 5+
- Vite 5+

**样式方案：**
- Tailwind CSS 3+
- Framer Motion (Aceternity UI 风格)

**开发工具：**
- ESLint + Prettier
- TypeScript 严格模式

**可选功能：**
- Vitest / Jest (单元测试)
- Playwright (E2E 测试)
- Husky + lint-staged (Git Hooks)

### Vue 模板

**核心框架：**
- Vue 3+
- TypeScript 5+
- Vite 5+

**UI 库：**
- Element Plus (自动导入)

**状态管理与路由：**
- Pinia (状态管理)
- Vue Router 4+

**样式方案：**
- Tailwind CSS 3+

**开发工具：**
- ESLint + Prettier
- TypeScript 严格模式

**可选功能：**
- Vitest / Jest (单元测试)
- Playwright (E2E 测试)
- Husky + lint-staged (Git Hooks)

## 🔧 脚手架工具技术栈

- **commander** - 命令行参数解析
- **inquirer** - 交互式命令行提示
- **fs-extra** - 文件系统操作
- **chalk** - 终端颜色输出
- **ora** - 命令行加载动画
- **validate-npm-package-name** - 包名验证

## 📝 可用命令

生成的项目中包含以下 npm scripts：

### 通用命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行 ESLint 检查
- `npm run format` - 格式化代码
- `npm run type-check` - TypeScript 类型检查

### 测试命令（如果选择了测试框架）

- `npm run test` - 运行单元测试
- `npm run test:ui` - 运行测试 UI（Vitest）

### E2E 测试命令（如果选择了 E2E 测试）

- `npm run test:e2e` - 运行 E2E 测试
- `npm run test:e2e:ui` - 运行 E2E 测试 UI
- `npm run test:e2e:install` - 安装 Playwright 浏览器

## 🏗️ 开发脚手架

### 项目结构

```
create-myapp-cli/
├── bin/                      # 可执行文件
│   └── create-myapp-cli.js  # CLI 入口
├── lib/                      # 核心逻辑
│   ├── createProject.js     # 项目创建逻辑
│   ├── prompts.js           # 交互式选项
│   └── utils.js             # 工具函数
├── templates/                # 项目模板
│   ├── react-template/      # React 项目模板
│   │   ├── prepare-template.cjs  # 模板预处理脚本
│   │   └── ...
│   └── vue-template/        # Vue 项目模板
│       ├── prepare-template.cjs  # 模板预处理脚本
│       └── ...
├── package.json
└── README.md
```

### 本地开发

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd create-myapp-cli
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **链接到全局（用于本地测试）**
   ```bash
   npm link
   ```

4. **测试脚手架**
   ```bash
   create-myapp-cli test-app
   ```

### 模板项目测试

模板项目本身可以直接运行，用于测试和开发：

```bash
# React 模板
cd templates/react-template
npm install  # 会自动执行 prepare 脚本处理模板变量
npm run dev

# Vue 模板
cd templates/vue-template
npm install  # 会自动执行 prepare 脚本处理模板变量
npm run dev
```

## ⚙️ 配置说明

### 包管理器选择

脚手架会根据你选择的包管理器（npm/yarn/pnpm）自动配置相应的脚本命令。

### 测试框架

- **Vitest**：推荐，与 Vite 集成良好，速度快
- **Jest**：传统选择，生态丰富
- **不需要测试**：不包含测试相关配置和依赖

### E2E 测试

如果选择包含 E2E 测试，会添加：
- Playwright 配置
- E2E 测试目录结构
- 相关 npm scripts

### Git Hooks

如果选择包含 Git Hooks，会添加：
- Husky 配置
- lint-staged 配置
- pre-commit hook（自动运行 lint 和 format）

## 📌 注意事项

1. **依赖安装**：脚手架生成项目后，需要手动运行 `npm install`（或 yarn/pnpm）安装依赖
2. **Node.js 版本**：确保使用 Node.js 18+ 版本，项目包含 `.nvmrc` 文件方便版本管理
3. **模板变量**：模板项目使用 `{{projectName}}` 作为占位符，在生成项目时会自动替换
4. **包管理器**：建议项目中使用统一的包管理器，避免混用导致依赖冲突

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT
