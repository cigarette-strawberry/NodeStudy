// 单个引入 支持别名
import data, { fn, num as n } from '../data.js'
const num = 10
console.log(data)
console.log(n, num)
fn()

// 导出全部
/* import * as all from '../data.js'
console.log(all) */

// ESModule 天然不支持json引用   vite 和 webpack具有 loader 支持json引用
// nodejs高版本 添加 assert { default: 'json' } 可以支持json引用
// import json from '../data.json' assert { default: 'json' }
