import fs from 'node:fs';
import download from 'download-git-repo';
import ora from 'ora';

const spinner = ora('正在下载模板...');

// 检查路径
export const checkPath = path => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

export const downloadTemplate = async (branch, name) => {
  spinner.start();
  try {
    await download(`direct:https://gitee.com/chinafaker/vue-template.git#${branch}`, name, { clone: true }, err => {
      if (err) {
        console.log(err);
      }
      spinner.succeed('模板下载成功');
    });
  } catch (error) {
    spinner.fail('模板下载失败');
  }
};
