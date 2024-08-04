// 在ECMAScript 2020 出现了一个globalThis全局变量，在nodejs环境会自动切换成global ，浏览器环境自动切换window
globalThis.aa = 1

console.log(__dirname)
console.log(__filename)
