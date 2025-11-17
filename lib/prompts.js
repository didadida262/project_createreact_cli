/**
 * 收集用户选项
 * @returns {Promise<Object>} 用户选择的配置选项
 */
async function collectOptions() {
  // 动态导入 inquirer (ES Module)
  const { default: inquirer } = await import('inquirer')
  
  const questions = [
    {
      type: 'list',
      name: 'packageManager',
      message: '选择包管理器:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ],
      default: 'npm'
    },
    {
      type: 'list',
      name: 'testFramework',
      message: '选择测试框架:',
      choices: [
        { name: 'Vitest (推荐)', value: 'vitest' },
        { name: 'Jest', value: 'jest' },
        { name: '不需要测试', value: 'none' }
      ],
      default: 'vitest'
    },
    {
      type: 'confirm',
      name: 'includeE2E',
      message: '是否包含 E2E 测试 (Playwright)?',
      default: false
    },
    {
      type: 'confirm',
      name: 'includeStorybook',
      message: '是否包含 Storybook?',
      default: false
    },
    {
      type: 'confirm',
      name: 'includeHusky',
      message: '是否包含 Git Hooks (Husky + lint-staged)?',
      default: true
    }
  ]

  return await inquirer.prompt(questions)
}

module.exports = { collectOptions }

