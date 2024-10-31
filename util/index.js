const util = require('util');
const { exec } = require('child_process');

/* exec('node --version', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}); */

/* // util.promisify 大致原理
const promisify = fn => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, ...data) => {
        if (err) {
          reject(err);
        }
        if (data && data.length > 1) {
          const obj = {};
          for (const key in data) {
            obj[key] = data[key];
          }
          resolve(obj);
        } else {
          resolve(data[0]);
        }
      });
    });
  };
};
const execPromise = promisify(exec); */

// 把上面代码改写成下面的形式
const execPromise = util.promisify(exec);
execPromise('node --version')
  .then(result => {
    // 如果返回多个参数 result是对象 如果是一个参数直接返回
    // console.log(`stdout: ${result.stdout}`);
    console.log(`stdout`, result);
  })
  .catch(error => {
    console.error(`exec error: ${error}`);
  });

// -----------------------------

const fn = isFlag => {
  if (isFlag) {
    return Promise.resolve('success');
  } else {
    return Promise.reject('error');
  }
};

/* // util.callbackify 原理
const callbackify = fn => {
  return (...args) => {
    const callback = args.pop(); // 最后一个参数是回调函数
    fn(...args)
      .then(data => {
        callback(null, data);
      })
      .catch(err => {
        callback(err);
      });
  };
};
const callback = callbackify(fn); */

const callback = util.callbackify(fn);

callback(false, (err, data) => {
  console.log(err, data);
});

// %s 匹配后面的字符串 %d 匹配后面的数字
console.log(util.format('foo %s bar %d', 'bar', 1)); // foo bar bar 1
