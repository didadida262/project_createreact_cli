# 快速开始指南

## 本地开发

### 安装依赖

```bash
npm install
```

### 测试脚手架

**方法1: 使用 npm link（推荐）**

```bash
npm link
create-myapp-cli my-test-app
```

**方法2: 直接使用 node**

```bash
node bin/create-myapp-cli.js my-test-app
```

### 测试生成的项目

```bash
cd my-test-app
npm install  # 手动安装依赖
npm run dev  # 启动开发服务器
```

## 发布到 npm

### 1. 准备工作

**检查 package.json 配置：**

确保以下字段正确配置：
- `name`: 包名（必须是唯一的，如 `create-myapp-cli`）
- `version`: 版本号（遵循语义化版本）
- `description`: 包描述
- `keywords`: 关键词（便于搜索）
- `author`: 作者信息
- `license`: 许可证
- `bin`: 可执行文件路径
- `files`: 发布时包含的文件（确保包含 `bin`、`lib`、`templates`）

**检查 .npmignore 或 package.json 的 files 字段：**

确保只发布必要的文件，排除：
- `node_modules/`
- `.git/`
- 测试文件
- 开发文档（可选）

### 2. 登录 npm

```bash
# 如果没有 npm 账号，先注册
npm adduser

# 或直接登录
npm login
```

### 3. 检查包名可用性

```bash
# 检查包名是否已被占用
npm view create-myapp-cli

# 如果返回 404，说明包名可用
# 如果返回包信息，说明已被占用，需要修改 package.json 中的 name
```

### 4. 版本管理

**更新版本号：**

```bash
# 方式1: 手动修改 package.json 中的 version 字段
# 方式2: 使用 npm version 命令（推荐）

# 补丁版本（1.0.0 -> 1.0.1）
npm version patch

# 次要版本（1.0.0 -> 1.1.0）
npm version minor

# 主要版本（1.0.0 -> 2.0.0）
npm version major
```

**版本号规则：**
- `major`: 不兼容的 API 修改
- `minor`: 向后兼容的功能新增
- `patch`: 向后兼容的问题修复

### 5. 发布前检查

**检查包内容：**

```bash
# 查看将要发布的内容
npm pack --dry-run

# 打包但不发布（用于检查）
npm pack
```

**运行测试（如果有）：**

```bash
npm test
```

### 6. 发布包

**发布到 npm 公共仓库：**

```bash
npm publish
```

**发布到特定 scope（可选）：**

如果使用 scope（如 `@your-org/create-myapp-cli`），需要：

```bash
# 1. 修改 package.json 中的 name 为 @your-org/create-myapp-cli
# 2. 发布时添加 --access public（scope 包默认是私有的）
npm publish --access public
```

### 7. 验证发布

**检查包是否发布成功：**

```bash
npm view create-myapp-cli
```

**测试安装和使用：**

```bash
# 使用 npx 测试（会从 npm 下载）
npx create-myapp-cli@latest my-test-app

# 或全局安装测试
npm install -g create-myapp-cli
create-myapp-cli my-test-app
```

### 8. 更新版本

发布新版本时，重复步骤 4-7：

```bash
# 1. 更新版本号
npm version patch  # 或 minor / major

# 2. 发布
npm publish

# 3. 验证
npm view create-myapp-cli version
```

### 9. 撤销发布（紧急情况）

**注意：npm 不允许删除已发布的包，只能撤销 72 小时内的版本**

```bash
# 撤销特定版本（72小时内）
npm unpublish create-myapp-cli@1.0.0

# 撤销整个包（72小时内，且没有其他版本）
npm unpublish create-myapp-cli --force
```

## 项目结构

```
create-myapp-cli/
├── bin/                      # 可执行文件
│   └── create-myapp-cli.js   # CLI 入口
├── lib/                      # 核心逻辑
│   ├── createProject.js      # 项目创建逻辑
│   ├── prompts.js            # 交互式选项
│   └── utils.js              # 工具函数
├── templates/                # 项目模板
│   ├── react-template/       # React 项目模板
│   └── vue-template/         # Vue 项目模板
└── package.json              # 包配置
```

## 注意事项

- **Node.js 版本**: 确保使用 Node.js >= 18.0.0
- **包名唯一性**: 发布前确保包名在 npm 上唯一
- **版本号**: 遵循语义化版本规范
- **文件大小**: 注意包的大小，避免包含不必要的文件
- **模板变量**: 模板中使用 `{{projectName}}` 格式的变量会被自动替换
