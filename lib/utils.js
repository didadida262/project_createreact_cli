const path = require('path')
const fs = require('fs-extra')
const validateNpmPackageName = require('validate-npm-package-name')

/**
 * 验证项目名称
 * @param {string} projectName - 项目名称
 * @returns {Object} { valid: boolean, errors: string[] }
 */
function validateProjectName(projectName) {
  const errors = []
  
  if (!projectName) {
    errors.push('项目名称不能为空')
    return { valid: false, errors }
  }

  // 验证 npm 包名格式
  const validation = validateNpmPackageName(projectName)
  if (!validation.validForNewPackages) {
    const npmErrors = validation.errors || []
    const npmWarnings = validation.warnings || []
    errors.push(...npmErrors, ...npmWarnings)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * 检查目录是否存在
 * @param {string} dirPath - 目录路径
 * @returns {boolean}
 */
function isDirectoryExists(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()
}

/**
 * 替换模板变量
 * @param {string} content - 文件内容
 * @param {Object} variables - 变量对象
 * @returns {string}
 */
function replaceTemplateVariables(content, variables) {
  let result = content
  Object.keys(variables).forEach(key => {
    const value = variables[key]
    // 将值转换为字符串
    const stringValue = typeof value === 'boolean' ? String(value) : String(value || '')
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g')
    result = result.replace(regex, stringValue)
  })
  return result
}

/**
 * 递归复制目录并替换模板变量
 * @param {string} src - 源目录
 * @param {string} dest - 目标目录
 * @param {Object} variables - 模板变量
 */
async function copyTemplate(src, dest, variables = {}) {
  await fs.ensureDir(dest)
  
  const items = await fs.readdir(src)
  
  // 排除的文件和目录（模板项目内部使用，不需要复制到生成的项目中）
  const excludeItems = ['node_modules', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'prepare-template.cjs']
  
  for (const item of items) {
    // 跳过排除的文件
    if (excludeItems.includes(item)) {
      continue
    }
    
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    const stat = await fs.stat(srcPath)
    
    if (stat.isDirectory()) {
      await copyTemplate(srcPath, destPath, variables)
    } else {
      let content = await fs.readFile(srcPath, 'utf-8')
      
      // 替换模板变量
      content = replaceTemplateVariables(content, variables)
      
      // 写入文件
      await fs.writeFile(destPath, content, 'utf-8')
    }
  }
}

/**
 * 检测包管理器
 * @returns {string} 'npm' | 'yarn' | 'pnpm'
 */
function detectPackageManager() {
  if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
    return 'yarn'
  }
  if (fs.existsSync(path.join(process.cwd(), 'pnpm-lock.yaml'))) {
    return 'pnpm'
  }
  return 'npm'
}

module.exports = {
  validateProjectName,
  isDirectoryExists,
  replaceTemplateVariables,
  copyTemplate,
  detectPackageManager
}

