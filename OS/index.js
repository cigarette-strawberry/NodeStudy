const os = require('os');
const { exec } = require('child_process'); // 子进程

console.log(os.platform()); // os.platform() 操作系统平台
console.log(os.release()); // os.release() 操作系统版本
console.log(os.type()); // os.type() 操作系统类型
console.log(os.version()); // os.version() 操作系统版本

// webpack vite rollup open:true 打开浏览器
// 判断不同的操作系统 分别调用对应的shell命令

const platform = os.platform();
const open = url => {
  if (platform === 'darwin') {
    exec(`open ${url}`);
  } else if (platform === 'win32') {
    exec(`start ${url}`);
  } else if (platform === 'linux') {
    exec(`xdg-open ${url}`);
  }
};

open('www.baidu.com');

// os.homedir() 用户主目录 底层原理是调用系统命令 %USERPROFILE% 或 $HOME
console.log(os.homedir());
console.log(os.arch()); // os.arch() 操作系统架构
console.log(os.cpus()); // os.cpus() CPU信息
console.log(os.cpus().length);
