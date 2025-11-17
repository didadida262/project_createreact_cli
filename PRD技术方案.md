# create-myapp-cli 脚手架 PRD 技术方案

## 1. 项目概述

### 1.1 项目背景
开发一个类似 `create-react-app` 的 React 项目脚手架工具，通过命令行快速创建干净、完善的 React 项目模板。

### 1.2 项目目标
- 提供一键式 React 项目创建能力
- 生成配置完善、结构清晰的 React 项目模板
- 支持通过 `npx create-myapp-cli <project-name>` 命令使用
- 项目模板包含必要的开发工具和最佳实践配置

### 1.3 核心价值
- **快速启动**：减少项目初始化时间，从零到可开发状态只需一条命令
- **最佳实践**：内置前端架构师级别的项目配置和结构
- **开箱即用**：包含必要的开发工具、构建配置和示例代码

---

## 2. 需求分析

### 2.1 功能需求

#### 2.1.1 核心功能
1. **项目创建**
   - 通过命令行创建新的 React 项目
   - 支持自定义项目名称
   - 自动在当前目录下创建项目文件夹

2. **项目模板**
   - 生成"干净"的 React 项目结构
   - 包含欢迎页面示例
   - 配置完善的开发环境

3. **命令行交互**
   - 支持命令行参数输入
   - 友好的错误提示和成功提示
   - 进度显示

#### 2.1.2 非功能需求
- **易用性**：命令简单直观，符合开发者使用习惯
- **稳定性**：创建过程稳定可靠，错误处理完善
- **可维护性**：代码结构清晰，易于扩展和维护

### 2.2 "干净的 React 项目"定义

从资深前端架构师角度，一个干净的 React 项目应包含：

#### 2.2.1 项目结构
```
my-app/
├── public/                 # 静态资源目录
│   ├── index.html         # HTML 模板
│   └── favicon.ico        # 网站图标
├── src/                   # 源代码目录
│   ├── components/        # 组件目录
│   │   └── Welcome/       # 欢迎组件
│   ├── styles/            # 样式文件目录
│   ├── utils/             # 工具函数目录
│   ├── App.jsx            # 根组件
│   ├── App.css            # 根组件样式
│   ├── index.jsx          # 入口文件
│   └── index.css          # 全局样式
├── .gitignore             # Git 忽略配置
├── package.json           # 项目依赖配置
├── README.md              # 项目说明文档
└── 其他配置文件...
```

#### 2.2.2 技术栈配置
- **React 18+**：使用最新稳定版本的 React
- **构建工具**：Vite（快速、现代化的构建工具）
- **CSS 处理**：支持原生 CSS，可选配置 CSS Modules
- **代码规范**：ESLint + Prettier
- **Git 配置**：预配置 .gitignore

#### 2.2.3 开发工具配置
- **热更新**：开发服务器支持 HMR
- **代码格式化**：Prettier 配置
- **代码检查**：ESLint 配置
- **路径别名**：配置 @ 别名指向 src 目录

---

## 3. 技术架构设计

### 3.1 技术选型

#### 3.1.1 核心技术
- **Node.js**：运行环境（建议 Node.js 14+）
- **npm/npx**：包管理和执行工具

#### 3.1.2 依赖库
- **commander**：命令行参数解析
- **inquirer**：交互式命令行提示（可选，用于未来扩展）
- **fs-extra**：文件系统操作增强
- **chalk**：终端颜色输出
- **ora**：命令行加载动画
- **validate-npm-package-name**：验证 npm 包名有效性

#### 3.1.3 项目模板技术栈
- **React 18+**：UI 框架
- **Vite 5+**：构建工具和开发服务器
- **ESLint**：代码检查工具
- **Prettier**：代码格式化工具

### 3.2 架构设计

#### 3.2.1 脚手架工具结构
```
create-myapp-cli/
├── bin/
│   └── create-myapp-cli.js    # 可执行入口文件
├── templates/                    # 项目模板目录
│   └── react-template/          # React 项目模板
│       ├── public/
│       ├── src/
│       ├── .gitignore
│       ├── package.json
│       ├── vite.config.js
│       ├── eslint.config.js
│       ├── prettier.config.js
│       └── README.md
├── lib/                          # 核心逻辑代码
│   ├── createProject.js         # 项目创建逻辑
│   ├── copyTemplate.js          # 模板复制逻辑
│   ├── installDependencies.js   # 依赖安装逻辑
│   └── utils.js                 # 工具函数
├── package.json
└── README.md
```

#### 3.2.2 执行流程
```
用户执行命令
    ↓
解析命令行参数（项目名称）
    ↓
验证项目名称有效性
    ↓
检查目标目录是否存在
    ↓
创建项目目录
    ↓
复制模板文件到目标目录
    ↓
替换模板中的变量（如项目名称）
    ↓
安装依赖（可选）
    ↓
显示成功信息和后续指引
```

---

## 4. 功能详细设计

### 4.1 命令行接口设计

#### 4.1.1 基本用法
```bash
npx create-myapp-cli <project-name>
```

#### 4.1.2 参数说明
- `<project-name>`：必需，项目名称
  - 必须符合 npm 包名规范
  - 不能包含大写字母（建议）
  - 不能与已存在的目录冲突

#### 4.1.3 命令选项（未来扩展）
```bash
# 指定模板版本
npx create-myapp-cli <project-name> --template <template-name>

# 跳过依赖安装
npx create-myapp-cli <project-name> --skip-install

# 使用 yarn 安装依赖
npx create-myapp-cli <project-name> --package-manager yarn
```

### 4.2 项目模板设计

#### 4.2.1 package.json 配置
```json
{
  "name": "{{projectName}}",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\""
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.33.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.2.0",
    "vite": "^5.0.0"
  }
}
```

#### 4.2.2 Vite 配置（vite.config.js）
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
```

#### 4.2.3 ESLint 配置（eslint.config.js）
```javascript
import js from 'eslint-plugin-js'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
]
```

#### 4.2.4 Prettier 配置（prettier.config.js）
```javascript
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  arrowParens: 'avoid',
}
```

#### 4.2.5 欢迎页面组件（src/components/Welcome/Welcome.jsx）
```jsx
import './Welcome.css'

function Welcome() {
  return (
    <div className="welcome">
      <h1>Welcome to {{projectName}}!</h1>
      <p>这是一个干净的 React 项目模板</p>
      <p>开始编辑 <code>src/App.jsx</code> 来开始你的项目</p>
    </div>
  )
}

export default Welcome
```

### 4.3 核心功能实现

#### 4.3.1 项目名称验证
- 使用 `validate-npm-package-name` 验证包名格式
- 检查目录是否已存在
- 提供友好的错误提示

#### 4.3.2 模板文件处理
- 使用 `fs-extra` 复制模板文件
- 使用模板引擎（如 `ejs` 或字符串替换）处理变量
- 处理特殊文件（如 `.gitignore`）

#### 4.3.3 依赖安装
- 检测包管理器（npm/yarn/pnpm）
- 执行 `npm install` 或相应命令
- 显示安装进度
- 处理安装失败情况

---

## 5. 技术实现方案

### 5.1 项目初始化

#### 5.1.1 创建 npm 包
```bash
mkdir create-myapp-cli
cd create-myapp-cli
npm init -y
```

#### 5.1.2 package.json 配置
```json
{
  "name": "create-myapp-cli",
  "version": "1.0.0",
  "description": "A CLI tool to create clean React projects",
  "bin": {
    "create-myapp-cli": "./bin/create-myapp-cli.js"
  },
  "files": [
    "bin",
    "lib",
    "templates"
  ],
  "keywords": [
    "react",
    "scaffold",
    "cli",
    "vite"
  ],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^11.1.0",
    "fs-extra": "^11.2.0",
    "ora": "^5.4.1",
    "validate-npm-package-name": "^4.0.0"
  }
}
```

### 5.2 核心代码实现

#### 5.2.1 入口文件（bin/create-myapp-cli.js）
```javascript
#!/usr/bin/env node

const { program } = require('commander')
const createProject = require('../lib/createProject')

program
  .version(require('../package.json').version)
  .argument('<project-name>', '项目名称')
  .action(async (projectName) => {
    await createProject(projectName)
  })

program.parse()
```

#### 5.2.2 项目创建逻辑（lib/createProject.js）
主要功能：
1. 验证项目名称
2. 检查目录冲突
3. 创建项目目录
4. 复制模板文件
5. 替换模板变量
6. 安装依赖
7. 显示成功信息

### 5.3 模板变量替换

使用简单的字符串替换或模板引擎处理：
- `{{projectName}}` → 实际项目名称
- `{{projectDescription}}` → 项目描述（可选）

---

## 6. 开发计划

### 6.1 开发阶段

#### Phase 1: 基础功能（1-2周）
- [ ] 搭建脚手架项目结构
- [ ] 实现命令行参数解析
- [ ] 实现项目名称验证
- [ ] 实现模板文件复制
- [ ] 实现模板变量替换
- [ ] 基础测试

#### Phase 2: 模板完善（1周）
- [ ] 创建 React 项目模板
- [ ] 配置 Vite 构建工具
- [ ] 配置 ESLint 和 Prettier
- [ ] 创建欢迎页面组件
- [ ] 编写模板 README

#### Phase 3: 功能增强（1周）
- [ ] 实现依赖自动安装
- [ ] 添加进度提示和动画
- [ ] 完善错误处理
- [ ] 添加成功提示和后续指引

#### Phase 4: 测试和优化（1周）
- [ ] 单元测试
- [ ] 集成测试
- [ ] 文档完善
- [ ] 性能优化
- [ ] 发布准备

### 6.2 里程碑

- **M1**：完成基础脚手架功能，可以创建项目
- **M2**：完成模板配置，生成的项目可正常运行
- **M3**：完成所有功能，通过测试
- **M4**：发布到 npm

---

## 7. 测试方案

### 7.1 单元测试
- 项目名称验证逻辑
- 模板变量替换逻辑
- 文件复制逻辑

### 7.2 集成测试
- 完整创建流程测试
- 不同场景测试（目录存在、名称无效等）
- 跨平台测试（macOS、Linux、Windows）

### 7.3 手动测试清单
- [ ] 使用有效项目名称创建项目
- [ ] 使用无效项目名称（应报错）
- [ ] 在已存在目录创建项目（应报错）
- [ ] 创建的项目可以正常启动
- [ ] 创建的项目可以正常构建
- [ ] 欢迎页面正常显示

---

## 8. 发布方案

### 8.1 npm 发布
1. 确保 package.json 配置正确
2. 确保 bin 字段指向正确的可执行文件
3. 添加 shebang (`#!/usr/bin/env node`)
4. 测试本地安装：`npm link`
5. 发布到 npm：`npm publish`

### 8.2 使用方式
发布后，用户可以通过以下方式使用：
```bash
npx create-myapp-cli my-app
```

### 8.3 版本管理
- 遵循语义化版本（Semantic Versioning）
- 主版本号：不兼容的 API 修改
- 次版本号：向下兼容的功能性新增
- 修订号：向下兼容的问题修正

---

## 9. 风险评估与应对

### 9.1 技术风险

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|----------|
| Node.js 版本兼容性问题 | 中 | 中 | 明确最低版本要求，添加版本检查 |
| 模板文件复制失败 | 高 | 低 | 完善的错误处理和回滚机制 |
| 依赖安装失败 | 中 | 中 | 提供跳过安装选项，给出手动安装指引 |
| 跨平台兼容性问题 | 中 | 中 | 使用跨平台库，充分测试 |

### 9.2 项目风险

| 风险 | 影响 | 概率 | 应对措施 |
|------|------|------|----------|
| 模板配置不够完善 | 中 | 中 | 参考业界最佳实践，持续迭代 |
| 用户反馈和需求变化 | 低 | 高 | 预留扩展接口，支持模板定制 |

---

## 10. 后续优化方向

### 10.1 功能扩展
1. **多模板支持**：支持 TypeScript、Tailwind CSS 等不同模板
2. **交互式选择**：使用 inquirer 让用户选择配置选项
3. **Git 初始化**：自动初始化 Git 仓库
4. **CI/CD 配置**：可选添加 GitHub Actions 等 CI 配置

### 10.2 体验优化
1. **更丰富的提示信息**：使用 emoji 和颜色增强可读性
2. **离线模式**：支持离线创建项目
3. **更新检查**：检查脚手架和模板版本更新

### 10.3 文档完善
1. **使用文档**：详细的使用说明和示例
2. **模板文档**：生成的项目的 README 说明
3. **贡献指南**：如何贡献新模板或功能

---

## 11. 附录

### 11.1 参考资源
- [create-react-app 源码](https://github.com/facebook/create-react-app)
- [Vite 官方文档](https://vitejs.dev/)
- [npm CLI 工具开发指南](https://docs.npmjs.com/cli/v8/using-npm/scripts)

### 11.2 相关工具对比

| 工具 | 特点 | 优势 |
|------|------|------|
| create-react-app | 官方脚手架 | 稳定、成熟 |
| Vite | 构建工具 | 快速、现代化 |
| 本脚手架 | 自定义 | 轻量、可定制 |

---

## 12. 总结

本技术方案详细规划了 `create-myapp-cli` 脚手架的开发工作，包括需求分析、技术架构、功能设计、实现方案、开发计划等各个方面。通过遵循本方案，可以开发出一个功能完善、易于使用的 React 项目脚手架工具。

**核心亮点**：
- 使用 Vite 作为构建工具，提供快速的开发体验
- 配置完善的开发环境（ESLint + Prettier）
- 清晰的项目结构和最佳实践
- 简单易用的命令行接口

**预期成果**：
用户可以通过一条简单的命令 `npx create-myapp-cli my-app` 快速创建一个配置完善、结构清晰的 React 项目，大大提升开发效率。

