/**
 * redis基本使用
 *
 * !字符串的操作
 * set key cigarette 设置
 *
 * set key cigarette nx 不存在则创建
 *
 * set key cigarette xx 存在则修改
 *
 * set key cigarette ex 10 设置过期时间
 *
 * get key 获取
 *
 * del key 删除
 *
 * !集合的操作
 * sadd key 1 1 2 2 3 3 设置集合
 *
 * smembers key 获取集合
 *
 * sismember key 1 判断集合中是否存在
 *
 * srem key 1 删除集合中的元素
 *
 * !哈希表操作
 * hset key attr value 设置哈希表
 *
 * hget key attr 获取哈希表
 *
 * hgetall key 获取所有哈希表[key:value]
 *
 * hdel key attr 删除哈希表
 *
 * !列表的操作
 * lpush key x y z 添加列表(倒序)
 *
 * rpush key 1 2 3 添加列表(正序)
 *
 * lrange key 0 0 获取第一个值
 *
 * lrange key 0 -1 获取所有值
 *
 * lset key 0 5 修改列表中索引为0的值
 *
 * lrem key 1 5 删除列表中元素为5的值
 *
 * llen key 获取列表长度
 */
