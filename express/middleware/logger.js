import log4js from 'log4js';

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'colored'
      }
    },
    file: {
      type: 'file',
      filename: 'logs/server.log'
    }
  },
  categories: {
    default: {
      appenders: ['out', 'file'],
      level: 'debug'
    }
  }
});

const logger = log4js.getLogger('default');

// next 执行下一个中间件 如果不写会一直卡着
// 每一个请求都会经过中间件
const loggerMiddleware = (req, res, next) => {
  logger.debug(`[${req.method}] ${req.url}`);
  next();
};

export default loggerMiddleware;
