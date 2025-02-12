/**
 * 新增
 * INSERT INTO [] VALUES []
 * 新增多条数据 使用逗号隔开
 * 如果表结构支持NULL 也可以插入NULL
 * INSERT INTO `user` (`name`,`age`,`address`,`hobby`) VALUES ('xiaowu', '18','金水区','篮球'),('xiaoyu', '18', '金水区', '手机');
 *
 * 更新
 * UPDATE [] SET [] WHERE []
 * UPDATE `user` SET `name` = 'xiaobai', `age` = '18', `address` = '经开区', `hobby` = '代码' WHERE `id` = 4;
 *
 * 删除
 * DELETE FROM [] WHERE []
 * DELETE FROM `user` WHERE `id` = 4;
 * 批量删除
 * DELETE FROM `user` WHERE `id` IN (1,2,3);
 */
