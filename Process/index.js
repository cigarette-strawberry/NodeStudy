/**
 * process 是Nodejs操作当前进程和控制当前进程的API，并且是挂载到globalThis下面的全局API
 *
 * process.arch 返回操作系统 CPU 架构 跟我们之前讲的os.arch 一样 'arm'、'arm64'、'ia32'、'mips'、'mipsel'、'ppc'、'ppc64'、's390'、's390x'、以及 'x64'
 *
 * process.argv 获取执行进程后面的参数 返回是一个数组 后面我们讲到命令行交互工具的时候会很有用，各种cli脚手架也是使用这种方式接受配置参数例如webpack
 *
 * process.cwd() 返回当前进程的工作目录 也可以和path拼接代替__dirname使用
 * ESM模式下用不了__dirname 可以使用cwd代替
 *
 * process.memoryUsage 获取当前进程的内存使用情况。该方法返回一个对象，其中包含了各种内存使用指标，如 rss（Resident Set Size，常驻集大小）、heapTotal（堆区总大小）、heapUsed（已用堆大小）和 external（外部内存使用量）等
 *
 * process.exit() 将强制进程尽快退出，即使仍有未完全完成的异步操作挂起
 *
 * process.kill() 与exit类似，kill用来杀死一个进程，接受一个参数进程id可以通过process.pid 获取
 *
 * process.env环境变量 获取操作系统所有的环境变量 可以修改 修改只在当前进程生效 不会真正影响到系统的环境变量
 */

console.log(process.arch);
console.log(process.platform);

console.log(process.argv);
console.log(process.argv.includes('--debug') ? '1.1.1' : 'wu'); // 在终端运行这段代码 node index.js --debug 会打印 1.1.1

console.log(process.cwd(), __dirname); // cwd 返回当前进程的工作目录

console.log(process.memoryUsage);

setTimeout(() => {
  console.log('exit退出进程');
}, 5000);
process.on('exit', () => {
  console.log('退出进程');
});
setTimeout(() => {
  process.exit();
}, 2000);

setTimeout(() => {
  console.log('kill杀死进程');
}, 5000);
setTimeout(() => {
  process.kill(process.pid);
}, 2000);

console.log(process.env);
console.log(process.env.NODE_ENV === 'dev' ? '开发环境' : '生产环境');

// cross-env 原理 跨平台的 Windows SET 设置环境变量； posix export 设置环境变量；
