/**
 * 操作数据库的命令
 * SHOW DATABASES 查看数据库
 * CREATE DATABASE 创建数据库
 * IF NOT EXISTS 如果这个数据库不存在就创建
 * DEFAULT CHARACTER SET = "utf8mb4" 创建数据库的时候设置字符集
 * CREATE DATABASE IF NOT EXISTS strawberry
 * DEFAULT CHARACTER SET = "utf8mb4"
 *
 * 操作数据表的命令
 * 字段名称 字段类型 字段属性
 * NOT NULL 字段不能为空
 * AUTO_INCREMENT 字段自增
 * PRIMARY KEY 设置字段主键
 * DEFAULT CURRENT_TIMESTAMP 填充默认值为创建时间
 * COMMENT 添加注释
 * ALTER 改变 RENAME 重命名
 * ADD COLUMN 增加列
 * DROP 删除列
 * MODIFY 编辑字段
 * CREATE TABLE `user` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) COMMENT '名字',
    age INT COMMENT "年龄",
    address VARCHAR(100) COMMENT '地址',
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
 * ) COMMENT '用户表'
 * ALTER TABLE `user1` RENAME `user`
 * ALTER TABLE `user` ADD COLUMN `hobby` VARCHAR(200) COMMENT '爱好'
 * ALTER TABLE `user` DROP `hobby`
 * ALTER TABLE `user` MODIFY `hobby` VARCHAR(100) COMMENT '喜好'
 */
