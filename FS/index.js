const fs = require('fs');
const fsPromises = require('fs').promises;
/**
 * 1.读取文件 readFile readFileSync readFilePromise
 *    三种策略 同步 异步 promise
 * 2.可读流 createReadStream
 * 3.创建文件夹 mkdirSync recursive
 * 4.删除 rmSync recursive
 * 5.重命名 renameSync
 * 6.监听文件变化 watch
 * 7.源码 libuv
 * 8.注意事项 事件循环
 *
 *
 * 1.写入文件 writeFileSync
 * 2.追加写入文件 appendFileSync
 *    两种方式
 * 3.创建可写流 createWriteStream
 * 4.软连接 硬连接 属于 pnpm底层原理
 */

// ------------读取文件----------------
// 不加sync是异步
/* fs.readFile('./text.txt', { encoding: 'utf-8', flag: 'r' }, (err, data) => {
  if (err) {
    console.log('读取文件失败', err);
    return;
  }
  console.log('读取文件成功', data);
}); */

// 同步代码会阻塞下面的代码执行
/* const res = fs.readFileSync('./text.txt', { encoding: 'utf-8', flag: 'r' });
console.log(res);
console.log('test'); */

/* fsPromises.readFile('./text.txt', { encoding: 'utf-8', flag: 'r' }).then(res => {
  console.log(res);
}); */

// ------------可读流----------------
// 处理大文件时会用
/* const result = fs.createReadStream('./text.txt', { encoding: 'utf-8', flag: 'r' });
result.on('data', data => {
  console.log(data);
});

result.on('end', () => {
  console.log('读取完成');
}); */

// ------------创建文件夹----------------
// fs.mkdirSync('./test/1/2/3', { recursive: true });

// ------------删除----------------
// fs.rmSync('./test', { recursive: true });

// ------------重命名----------------
// 原始名称 新名称
// fs.renameSync('./text1.txt', './text.txt');

// ------------监听文件变化----------------
// 事件类型可以是  rename(文件重命名) change(文件内容变化)
/* fs.watch('./text.txt', (eventType, filename) => {
  console.log(eventType, filename);
}); */

// ------------注意事项----------------
// fs 所有IO操作都是由libuv完成的
// 完成后推入V8事件循环队列
/* fsPromises.readFile('./text.txt', { encoding: 'utf-8', flag: 'r' }).then(res => {
  console.log(res);
});

// setImmediate 等本轮事件循环结束执行
// 计时器都是由V8事件循环完成的
setImmediate(() => {
  console.log('setImmediate');
}); */

// ------------写入文件----------------
// fs.writeFileSync('./text.txt', 'hello world', { encoding: 'utf-8', flag: 'w' });

// ------------追加写入文件----------------
// fs.writeFileSync('./text.txt', '\nhello world', { encoding: 'utf-8', flag: 'a' });

// fs.appendFileSync('./text.txt', 'hello world');

// ------------创建可写流----------------
/* const writeStream = fs.createWriteStream('./text.txt', { encoding: 'utf-8', flag: 'w' });

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
nums.forEach(item => {
  writeStream.write(item + '\n');
});
writeStream.end();
writeStream.on('finish', () => {
  console.log('写入完成');
}); */

// ------------软连接 硬连接----------------
// 硬连接 共享文件 备份文件
// 软连接 管理员权限 Windows的快捷方式
// 硬连接指向的是文件本身 软连接指向的是文件路径
// 硬连接可以删除源文件 软连接不能删除源文件

/* // 硬连接
fs.linkSync('./text.txt', './text1.txt');

// 软连接
fs.symlinkSync('./text.txt', './text2.txt'); */
