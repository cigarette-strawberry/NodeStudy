/**
 * CREATE TABLE `book` (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) COMMENT '书名',
    author VARCHAR(100) COMMENT '作者',
    release_time TIMESTAMP COMMENT '发布时间',
    time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    user_id INT COMMENT '用户ID'
 * ) COMMENT '图书表'
 * 
 * # 子查询
 * # 语法 要用小括号包起来
 * SELECT * from `book` WHERE user_id = (SELECT id from `user` WHERE name = 'cigarette')
 * 
 * # 连接查询
 * 
 * # 内连接
 * SELECT * FROM `book`,`user` WHERE `book`.`user_id` = `user`.`id`
 * 
 * # 外连接 左连接 右连接
 * # LEFT JOIN [表名] ON [连接的条件]
 * # LEFT 左侧表为驱动表
 * # RIGHT 右侧表为驱动表
 * SELECT * FROM `user` LEFT JOIN `book` ON `book`.`user_id` = `user`.`id` 
 *  */
