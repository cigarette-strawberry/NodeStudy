#!/usr/bin/env node
// 告诉操作系统我执行自定义命令的时候 使用node来执行 这个文件

import { program } from 'commander';
import fs from 'node:fs';
import inquirer from 'inquirer';
import { checkPath, downloadTemplate } from './utils.js';

const json = fs.readFileSync('./package.json', 'utf-8');
const packageJson = JSON.parse(json);

program.version(packageJson.version);

program
  .command('create <name>')
  .alias('c')
  .description('创建项目')
  .action(name => {
    inquirer
      .prompt([
        {
          type: 'input', // 输入
          name: 'name', // 返回key
          message: '请输入项目描述', // 提示
          default: name // 默认值
        },
        {
          type: 'confirm',
          name: 'isTS',
          message: '是否选用typescript模板'
        }
      ])
      .then(answers => {
        console.log(answers);

        if (checkPath(answers.name)) {
          return console.log(`项目${answers.name}已存在`);
        }
        if (answers.isTS) {
          downloadTemplate('ts', answers.name);
        } else {
          downloadTemplate('js', answers.name);
        }
      });
  });

program.parse(process.argv);
