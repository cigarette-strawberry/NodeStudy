const fs = require('fs')

exports.readFileSync = function () {
  // 指定要读取的目录路径
  const filePath = '/Users/脚本/抖音小游戏.txt'

  // 使用readFileSync同步地读取文件内容
  try {
    const data = fs.readFileSync(filePath)
    console.log(`文件内容：${data}`)
  } catch (err) {
    console.error(`无法读取文件：${err}`)
  }
}
