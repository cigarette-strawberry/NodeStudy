export const proxyConfig = [
  {
    upstream: 'http://localhost:9001', // 代理目标地址
    prefix: '/pc', // 代理前缀
    rewritePrefix: '', // 重写前缀
    httpMethods: ['GET', 'POST']
  },
  {
    upstream: 'http://localhost:9002', // 代理目标地址
    prefix: '/mobile', // 代理前缀
    rewritePrefix: '', // 重写前缀
    httpMethods: ['GET', 'POST']
  }
];
