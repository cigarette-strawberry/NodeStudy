const { exec, execSync, spawn, spawnSync, execFile, execFileSync, fork } = require('child_process');
const path = require('path');
/**
 * 1.exec 异步方法 回调函数 返回buffer 可以帮我们执行shell命令 或者 跟软件进行交互
 * 2.execSync 同步方法
 * 3.执行较小的shell命令 想要立马拿到结果的shell execSync exec字节上限200kb 超出200kb会报错
 *
 * 4.spawn 没有字节上限 因为返回的是一个流 实时返回
 * 5.spawnSync 用的较少
 *
 * 6.execFile 执行可执行的文件
 * 底层实现顺序
 * exec -> execSync -> execFile
 *
 * 7.fork 只能接受js模块 Nodejs CPU密集型应用 耗时的代码
 * IPC 通讯 IPC基于libuv (windows named pipe) (posix unix domain socket)
 */

/* exec('node -v', (error, stdout, stderr) => {
  if (error) return;
  console.log(stdout.toString());
});

const nodeVersion = execSync('node -v');
console.log(nodeVersion.toString());

execSync('open https://www.baidu.com'); */

// ------------------------------------------

/* const { stdout } = spawn('netstat');

stdout.on('data', chunk => {
  console.log(chunk.toString());
});
stdout.on('close', () => {
  console.log('关闭');
}); */

// ------------------------------------------

/* execFile(path.resolve(__dirname, './bat.sh'), null, (error, stdout, stderr) => {
  console.log(stdout.toString());
}); */

// ------------------------------------------

const testChildProcess = fork('./test.js');

testChildProcess.send('我是主进程：收到请回答');

testChildProcess.on('message', (message, sendHandle) => {
  console.log(message);
});
