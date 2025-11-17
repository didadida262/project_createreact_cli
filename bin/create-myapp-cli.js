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

