export const rateLimitConfig = {
  max: 5, // 每个IP每分钟最多5次请求
  timeWindow: '1 minute' // 时间窗口为1分钟
};

export const cachingConfig = {
  privacy: 'public', // 缓存策略为公共缓存
  expiresIn: 60000, // 缓存时间为60秒
  cacheControl: true, // 启用缓存控制
  max: 1000 // 最大缓存条目数为1000
};

export const breakerConfig = {
  timeout: 3000, // 超时时间为3秒
  errorThresholdPercentage: 50, // 错误阈值百分比为50%
  resetTimeout: 30000 // 重置超时时间为30秒
};
