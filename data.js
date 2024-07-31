const data = {
  success: true,
  error: false
}

const fn = () => {
  console.log('fn')
}

// CommonJS 导出
/* module.exports = {
  data,
  fn,
  num: 123
} */

// ESModule 导出
export default data
export { fn }
export const num = 123

/**
 * CommonJS 和 ESModule 的区别
 * CommonJS 是基于运行时的同步加载，ESModule 是基于编译时的异步加载
 * CommonJS 是可以修改值的，ESModule 值并且不可修改（可读的）
 * CommonJS 不可以tree shaking，ESModule 支持tree shaking
 * CommonJS 中顶层的this指向这个模块本身，而 ESModule 中顶层this指向undefined
 */

console.log(this)

if (true) {
  // CommonJS 是基于运行时的同步加载 可以在此处使用 但是文件过大会阻碍下面的代码执行 既是缺点也是优点
  //   const a = require('./data')

  // ESModule 是基于编译时的异步加载 不能在此处使用 导入声明只能在模块的顶层使用。
  //   import b from './data'

  // ESModule 函数模式可以动态导入 返回值是promise (defineAsyncContent vue3异步组件便是如此)
  import('./data').then(res => {})
}

/**
 * ‌Tree Shaking的原理
 * ‌Tree Shaking的原理主要基于‌静态分析和‌模块化编程的特性，旨在消除无用的JavaScript代码，从而减小文件体积并加快执行速度。具体来说，Tree Shaking通过以下步骤实现：
 * 1.形成抽象语法树（AST）：程序从入口文件开始，扫描所有的模块依赖及其子依赖，然后将它们链接起来形成一个AST。这一步是理解代码结构和依赖关系的基础。
 * 2.静态分析：运行所有代码，查看哪些代码实际上被使用过，并做好标记。这一步通过运行代码来确定哪些代码是实际被执行的，为下一步做准备。
 * 3.删除未使用的代码：最后，将AST中未被使用的代码“摇落”，即删除这些代码。这一步是根据前面的分析结果，实际删除那些没有被使用的代码，以达到优化代码的目的。
 * Tree Shaking特别适用于JavaScript环境，因为JavaScript代码通常需要通过网络加载和执行，文件越小，执行时间越短。此外，Tree Shaking与传统的死代码消除（DCE）不同，它更关注于消除那些没有被使用的代码，而不是简单地消除不可能执行的代码。‌
 * 例如，在‌Webpack中，如果某个模块的导出值没有被其他模块使用，Terser可以成功删除这些未使用的代码。这表明Tree Shaking在实际工具中的应用和效果。‌
 */
