// path模块在不同的操作系统是有差异的(windows | posix)
const path = require('node:path')
// 1. basename 返回给定路径的最后一部分
// windows 兼容正斜杠
// posix 无法处理windows路径
// console.log(path.basename('/Users/study/node study/Path windows & posix'))
// console.log(path.win32.basename('\\Users\\study\\node study\\Path windows & posix'))

// 2. dirname 返回除了最后一个文件前面的路径
// console.log(path.dirname('/Users/study/node study/Path windows & posix'))

// 3. extname 返回路径的扩展名 后缀
// 返回的是带点的 .js
// 没有点 返回空字符串
// 多个点 返回最后一个点后面的内容
/* console.log(path.extname('index.js'))
console.log(path.extname('index'))
console.log(path.extname('index.a.b.c.d.html')) */

// 4. join 返回拼接的路径 支持操作符
/* console.log(path.join('/a', '/b', '/c'))
console.log(path.join('/a', '/b', '/c', '../../')) */

// 5. resolve 返回绝对路径
// 最后一个是绝对路径 返回最后一个路径
// 第一个是绝对路径 返回拼接的路径
// 只有相对路径返回当前工作目录的绝对路径
/* console.log(path.resolve('/a', '/b', '/c'))
console.log(path.resolve('./index'))
console.log(path.resolve('./index', './a'))
console.log(path.resolve('/b', './index', './a'))
console.log(path.resolve('./index', './a', '/b'))
console.log(path.resolve(__dirname, './index')) */

// 6. parse 返回解析路径后的对象
// console.log(path.parse('/Users/study/node study/Path windows & posix'))
/* 
{
    root: '/',
    dir: '/Users/study/node study',
    base: 'Path windows & posix',
    ext: '',
    name: 'Path windows & posix'
}
*/

// 7. format 返回解析对象后的路径
/* console.log(
  path.format({
    root: '/',
    dir: '/Users/study/node study',
    base: 'Path windows & posix',
    ext: '',
    name: 'Path windows & posix'
  })
) */

// 8. sep windows 返回 /      posix 返回 \
console.log(path.sep)
console.log(path.win32.sep)
