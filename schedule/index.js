import schedule from 'node-schedule';
import request from 'request';

/* 
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    │
    │    │    │    │    │    └── 星期（0 - 6，0表示星期日）
    │    │    │    │    └───── 月份（1 - 12）
    │    │    │    └────────── 日（1 - 31）
    │    │    └─────────────── 小时（0 - 23）
    │    └──────────────────── 分钟（0 - 59）
    └───────────────────────── 秒（0 - 59）
*/

/* 
数值：表示具体的时间单位，如1、2、10等。
范围：使用-连接起始和结束的数值，表示一个范围内的所有值，如1-5表示1到5的所有数值。
通配符：使用*表示匹配该字段的所有可能值，如*表示每分钟、每小时、每天等。
逗号分隔：使用逗号分隔多个数值或范围，表示匹配其中任意一个值，如1,3表示1或3。
步长：使用/表示步长，用于指定间隔的数值，如 * /5表示每隔5个单位执行一次。
特殊字符：Cron表达式还支持一些特殊字符来表示特定的含义，如?用于替代日和星期字段中的任意值，L表示最后一天，W表示最近的工作日等。
*/

// 开始计时任务
schedule.scheduleJob('*/2 * * * * *', () => {
  request(
    'https://api.juejin.cn/growth_api/v1/check_in?aid=""&uuid=""',
    {
      method: 'post',
      headers: {
        referer: 'https://juejin.cn/',
        cookie: ''
      }
    },
    function (err, res, body) {
      console.log(body);
    }
  );
});

// 取消计时任务
// schedule.cancelJob('*/5 * * * * *', () => {});
