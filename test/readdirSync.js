const fs = require('fs')

module.exports = function () {
  // 指定要读取的目录路径
  const directoryPath = '/Users'

  // 调用readdirSync函数同步地读取目录中的所有文件和子目录
  try {
    const filesAndDirectories = fs.readdirSync(directoryPath)

    // 打印每个文件或子目录的名称
    for (let i = 0; i < filesAndDirectories.length; i++) {
      console.log(filesAndDirectories[i])
    }
  } catch (error) {
    console.error(`无法读取目录 ${directoryPath}:`, error)
  }
}
