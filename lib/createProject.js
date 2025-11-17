const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')
const ora = require('ora')
const {
  validateProjectName,
  isDirectoryExists,
  copyTemplate,
} = require('./utils')
const { collectOptions } = require('./prompts')

/**
 * 创建项目
 * @param {string} projectName - 项目名称
 */
async function createProject(projectName) {
  try {
    // 1. 验证项目名称
    console.log(chalk.blue('🔍 验证项目名称...'))
    const validation = validateProjectName(projectName)
    if (!validation.valid) {
      console.error(chalk.red('❌ 项目名称验证失败:'))
      validation.errors.forEach(error => {
        console.error(chalk.red(`   - ${error}`))
      })
      process.exit(1)
    }

    // 2. 检查目标目录是否存在
    const targetPath = path.resolve(process.cwd(), projectName)
    if (isDirectoryExists(targetPath)) {
      console.error(chalk.red(`❌ 目录 "${projectName}" 已存在，请选择其他名称`))
      process.exit(1)
    }

    // 3. 收集用户选项
    console.log()
    const options = await collectOptions()
    console.log()

    // 4. 创建项目目录
    console.log(chalk.blue(`📁 创建项目目录: ${projectName}`))
    await fs.ensureDir(targetPath)

    // 5. 复制模板文件
    const spinner = ora('📦 复制项目模板...').start()
    try {
      const templatePath = path.join(__dirname, '..', 'templates', 'react-template')
      
      if (!fs.existsSync(templatePath)) {
        spinner.fail('模板目录不存在')
        console.error(chalk.red(`模板路径不存在: ${templatePath}`))
        process.exit(1)
      }

      const variables = {
        projectName: projectName,
        packageManager: options.packageManager,
        testFramework: options.testFramework,
        includeE2E: options.includeE2E,
        includeStorybook: options.includeStorybook,
        includeHusky: options.includeHusky
      }

      await copyTemplate(templatePath, targetPath, variables)
      spinner.succeed('项目模板复制完成')
    } catch (error) {
      spinner.fail('模板复制失败')
      console.error(chalk.red(`复制模板时出错: ${error.message}`))
      // 清理已创建的目录
      await fs.remove(targetPath)
      process.exit(1)
    }

    // 6. 根据选项生成配置文件
    await generateConfigFiles(targetPath, options)

    // 7. 显示成功信息和后续指引
    console.log()
    console.log(chalk.green('✅ 项目创建成功!'))
    console.log()
    console.log(chalk.cyan('下一步:'))
    console.log(chalk.white(`  cd ${projectName}`))
    console.log(chalk.white(`  ${options.packageManager} install`))
    console.log(chalk.white(`  ${options.packageManager} run dev`))
    console.log()

  } catch (error) {
    console.error(chalk.red(`❌ 创建项目时出错: ${error.message}`))
    if (error.stack) {
      console.error(chalk.gray(error.stack))
    }
    process.exit(1)
  }
}

/**
 * 根据选项生成配置文件
 * @param {string} targetPath - 目标路径
 * @param {Object} options - 用户选项
 */
async function generateConfigFiles(targetPath, options) {
  const spinner = ora('⚙️  生成配置文件...').start()
  
  try {
    const packageJsonPath = path.join(targetPath, 'package.json')
    const packageJson = await fs.readJson(packageJsonPath)
    
    // 更新 scripts 中的包管理器命令
    if (options.packageManager !== 'npm') {
      Object.keys(packageJson.scripts || {}).forEach(key => {
        if (packageJson.scripts[key].includes('npm run')) {
          packageJson.scripts[key] = packageJson.scripts[key].replace(/npm run/g, `${options.packageManager} run`)
        }
      })
    }

    // 根据选项添加测试相关依赖和脚本
    if (options.testFramework === 'vitest') {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies['@testing-library/react'] = '^14.1.2'
      packageJson.devDependencies['@testing-library/jest-dom'] = '^6.1.5'
      packageJson.devDependencies['@testing-library/user-event'] = '^14.5.1'
      packageJson.devDependencies['vitest'] = '^1.0.4'
      packageJson.devDependencies['@vitest/ui'] = '^1.0.4'
      packageJson.devDependencies['jsdom'] = '^23.0.1'
      packageJson.scripts.test = 'vitest'
      packageJson.scripts['test:ui'] = 'vitest --ui'
    } else if (options.testFramework === 'jest') {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies['@testing-library/react'] = '^14.1.2'
      packageJson.devDependencies['@testing-library/jest-dom'] = '^6.1.5'
      packageJson.devDependencies['@testing-library/user-event'] = '^14.5.1'
      packageJson.devDependencies['jest'] = '^29.7.0'
      packageJson.devDependencies['@types/jest'] = '^29.5.11'
      packageJson.devDependencies['ts-jest'] = '^29.1.1'
      packageJson.devDependencies['jest-environment-jsdom'] = '^29.7.0'
      packageJson.scripts.test = 'jest'
    }

    // E2E 测试
    if (options.includeE2E) {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies['@playwright/test'] = '^1.40.1'
      packageJson.scripts['test:e2e'] = 'playwright test'
      packageJson.scripts['test:e2e:ui'] = 'playwright test --ui'
      packageJson.scripts['test:e2e:install'] = 'playwright install'
    }

    // Storybook
    if (options.includeStorybook) {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies['@storybook/react'] = '^7.6.3'
      packageJson.devDependencies['@storybook/react-vite'] = '^7.6.3'
      packageJson.devDependencies['storybook'] = '^7.6.3'
      packageJson.scripts.storybook = 'storybook dev -p 6006'
      packageJson.scripts['build-storybook'] = 'storybook build'
    }

    // Husky
    if (options.includeHusky) {
      packageJson.devDependencies = packageJson.devDependencies || {}
      packageJson.devDependencies['husky'] = '^8.0.3'
      packageJson.devDependencies['lint-staged'] = '^15.2.0'
      packageJson.scripts.prepare = 'husky install'
    }

    await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
    
    // 创建额外的配置文件
    if (options.includeHusky) {
      await createHuskyConfig(targetPath)
    }
    
    if (options.includeE2E) {
      await createPlaywrightConfig(targetPath, options.packageManager)
    }
    
    if (options.testFramework === 'vitest') {
      await createVitestConfig(targetPath)
    } else if (options.testFramework === 'jest') {
      await createJestConfig(targetPath)
    }
    
    spinner.succeed('配置文件生成完成')
  } catch (error) {
    spinner.fail('配置文件生成失败')
    console.warn(chalk.yellow(`警告: ${error.message}`))
  }
}

/**
 * 创建 Husky 配置
 */
async function createHuskyConfig(targetPath) {
  const huskyDir = path.join(targetPath, '.husky')
  await fs.ensureDir(huskyDir)
  
  // pre-commit hook
  const preCommitContent = `#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
`
  await fs.writeFile(path.join(huskyDir, 'pre-commit'), preCommitContent)
  
  // lint-staged 配置添加到 package.json（已在上面处理）
  const packageJsonPath = path.join(targetPath, 'package.json')
  const packageJson = await fs.readJson(packageJsonPath)
  packageJson['lint-staged'] = {
    '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
    '*.{css,json,md}': ['prettier --write']
  }
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 })
}

/**
 * 创建 Playwright 配置
 */
async function createPlaywrightConfig(targetPath, packageManager = 'npm') {
  const configContent = `import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: '${packageManager} run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
`
  await fs.writeFile(path.join(targetPath, 'playwright.config.ts'), configContent)
  await fs.ensureDir(path.join(targetPath, 'e2e'))
}

/**
 * 创建 Vitest 配置
 */
async function createVitestConfig(targetPath) {
  const configContent = `import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
`
  await fs.writeFile(path.join(targetPath, 'vitest.config.ts'), configContent)
  
  // 创建测试设置文件
  const setupDir = path.join(targetPath, 'src', 'test')
  await fs.ensureDir(setupDir)
  const setupContent = `import '@testing-library/jest-dom'
`
  await fs.writeFile(path.join(setupDir, 'setup.ts'), setupContent)
}

/**
 * 创建 Jest 配置
 */
async function createJestConfig(targetPath) {
  const configContent = `export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
      },
    }],
  },
}
`
  await fs.writeFile(path.join(targetPath, 'jest.config.js'), configContent)
  
  // 创建测试设置文件
  const setupDir = path.join(targetPath, 'src', 'test')
  await fs.ensureDir(setupDir)
  const setupContent = `import '@testing-library/jest-dom'
`
  await fs.writeFile(path.join(setupDir, 'setup.ts'), setupContent)
}

module.exports = createProject
