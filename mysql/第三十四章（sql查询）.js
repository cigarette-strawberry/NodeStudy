/**
 * 查询单个列 SELECT id FROM `user`
 *
 * 查询多个列 列名用逗号隔开 SELECT id, name FROM `user`
 *
 * 查询所有列 [*]; 通配符 SELECT * FROM `user`
 *
 * 列的别名 [AS]; SELECT id AS user_id FROM `user`
 *
 * 排序 [ORDER BY] [DESC降序 ASC升序]; SELECT * FROM `user` ORDER BY id DESC
 *
 * 限制查询结果 [LIMIT 0,1 开始行0,数量1;从第0开始查询一条] SELECT * FROM `user` LIMIT 0,1
 *
 * 条件查询 [WHERE 完全匹配]; SELECT * FROM `user` WHERE age = '18'
 *
 * 联合查询 [AND OR]; SELECT * FROM `user` WHERE name = 'cigarette' AND age = '18'
 *
 * 模糊查询 [LIKE %匹配0到多个字符 _匹配一个字符]; SELECT * FROM `user` WHERE name LIKE '%cig%'
 */
