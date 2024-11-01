### 编写脚手架

commander inquirer ora download-git-repo npm 库

1. 自定义命令 而不是 通过 node 去执行我们的脚本

```json
  "bin": {
    "scaffold": "src/index.js"
  }
```

```shell
  npm link
  创建软连接挂载到全局
```

2. 命令行交互工具
3. 下载模板
