在 1Panel 中为 RabbitMQ 安装 x-delayed-message 插件（实现延迟队列功能），可以按照以下步骤操作：

1. 进入 RabbitMQ 容器
   在 1Panel 左侧菜单选择 "容器"，找到 RabbitMQ 容器（通常名为 rabbitmq）。

点击 "终端" 进入容器内部（或使用 docker exec 命令）：

docker exec -it rabbitmq /bin/bash

2. 下载并启用插件

# 查看 RabbitMQ 版本（确保插件版本兼容）

rabbitmqctl version

# 下载插件（示例为 3.12.0，根据版本调整）

wget https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases/download/3.12.0/rabbitmq_delayed_message_exchange-3.12.0.ez

3. 将插件移动到插件目录

   mkdir -p /plugins
   mv rabbitmq_delayed_message_exchange-3.12.0.ez /plugins/

4. 启用插件
   rabbitmq-plugins enable rabbitmq_delayed_message_exchange

5. 重启 RabbitMQ：
