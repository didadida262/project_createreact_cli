# 快速开始指南

## 安装依赖

首先安装项目依赖：

```bash
npm install
```

## 本地测试

### 方法1: 使用 npm link（推荐）

1. 在项目根目录执行：

```bash
npm link
```

2. 然后在任何目录下都可以使用：

```bash
create-myapp-cli my-test-app
```

### 方法2: 直接使用 node

```bash
node bin/create-myapp-cli.js my-test-app
```

### 方法3: 使用 npx（如果已发布）

```bash
npx create-myapp-cli my-test-app
```

## 测试创建的项目

创建项目后，进入项目目录：

```bash
cd my-test-app
npm install  # 如果自动安装失败，手动安装
npm run dev  # 启动开发服务器
```

## 发布到 npm

1. 确保已登录 npm：

```bash
npm login
```

2. 检查 package.json 中的版本号

3. 发布：

```bash
npm publish
```

发布后，任何人都可以通过以下命令使用：

```bash
npx create-myapp-cli my-app
```

## 项目结构说明

- `bin/` - 可执行入口文件
- `lib/` - 核心逻辑代码
  - `createProject.js` - 项目创建主逻辑
  - `utils.js` - 工具函数
- `templates/` - 项目模板
  - `react-template/` - React 项目模板

## 注意事项

- 确保 Node.js 版本 >= 14
- 模板变量使用 `{{projectName}}` 格式
- 所有模板文件都会被复制并替换变量

