const eventEmitter = require('events');

// 发布订阅 on emit once off
// 多个发布者，多个订阅者

const emitter = new eventEmitter();

// 订阅
emitter.on('event', (arg1, arg2) => {
  console.log(arg1, arg2);
});
emitter.on('event', (arg1, arg2) => {
  console.log(arg1, arg2);
});

// once 只订阅一次
emitter.once('event', (arg1, arg2) => {
  console.log('once', arg1, arg2);
});

// 发布
emitter.emit('event', 'arg1', 'arg2');
emitter.emit('event', 'arg3', 'arg4');

const fn = (arg1, arg2) => {
  console.log(arg1, arg2);
};
emitter.on('test', fn);
// 取消订阅
emitter.off('test', fn);
emitter.emit('test', 'arg5', 'arg6');

// nodejs 事件默认只能监听10个事件，超过10个会报错
emitter.setMaxListeners(20);
console.log(emitter.getMaxListeners()); // 20

// ----------------------------------------------------

// 箭头函数没有原型 prototype，所以不能添加原型上的方法
const fn1 = function () {};
const fn2 = function () {};
fn1.prototype.test = 111;
fn2.prototype.test = 666;
const a = new fn1();
const b = new fn2();
Object.setPrototypeOf(a, b);
// console.log(Object.getPrototypeOf(a));
console.log(a.test);
