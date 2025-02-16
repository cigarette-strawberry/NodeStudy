/**
 * SELECT * FROM `user`
 *
 * SELECT age + 100 as age FROM `user`
 *
 * # 合并
 * SELECT CONCAT (`name`,'小') as name FROM `user`
 *
 * # 截取第一位
 * SELECT LEFT (`name`,1) as name FROM `user`
 *
 * # 截取最后一位
 * SELECT RIGHT (`name`,1) as name FROM `user`
 *
 * # 随机数
 * SELECT RAND() FROM `user`
 *
 * # 求和
 * SELECT SUM(`age`) FROM `user`
 *
 * # 求平均数
 * SELECT AVG(`age`) FROM `user`
 *
 * # 最大值
 * SELECT MAX(`age`) FROM `user`
 *
 * # 最小值
 * SELECT MIN(`age`) FROM `user`
 *
 * # 总和
 * SELECT COUNT(*) FROM `user`
 *
 * # 当前时间
 * SELECT NOW() FROM `user`
 *
 * # 加一天
 * SELECT DATE_ADD(NOW(), INTERVAL 1 DAY) FROM `user`
 *
 * # 减一天
 * SELECT DATE_SUB(NOW(), INTERVAL 1 DAY) FROM `user`
 *
 * ALTER TABLE `user` ADD COLUMN `sex` INT COMMENT '性别'
 *
 * SELECT IF(sex = 1, '男', '女') as sex FROM `user`
 *
 */
