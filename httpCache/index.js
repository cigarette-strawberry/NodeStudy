/**
 * HTTP 缓存主要分为两大类：强缓存和协商缓存。这两种缓存都通过 HTTP 响应头来控制，目的是提高网站性能。
 *
 * 强缓存
 * 强缓存之后则不需要向服务器发送请求，而是从浏览器缓存读取分为（内存缓存）| （硬盘缓存）
 * ? 1.memory cache(内存缓存) 内存缓存存储在浏览器内存当中，一般刷新网页的时候会发现很多内存缓存
 * ? 2.disk cache(硬盘缓存) 硬盘缓存是存储在计算机硬盘中，空间大，但是读取效率比内存缓存慢
 *
 * 强缓存 有两种分别是(Expires 和 Cache-Control)
 *  ? 1、Expires
 *  Expires: 该字段指定响应的到期时间，即资源不再被视为有效的日期和时间。它是一个 HTTP 1.0 的头部字段，但仍然被一些客户端和服务器使用。
 *  Expires 的判断机制是：当客户端请求资源时，会获取本地时间戳，然后拿本地时间戳与 Expires 设置的时间做对比，如果对比成功，走强缓存，对比失败，则对服务器发起请求。
 *
 *  ? 2、Cache-Control
 *  Cache-Control 的值如下：
 *    max-age：浏览器资源缓存的时长(秒)。
 *    no-cache：不走强缓存，走协商缓存。
 *    no-store：禁止任何缓存策略。
 *    public：资源即可以被浏览器缓存也可以被代理服务器缓存(CDN)。
 *    private：资源只能被客户端缓存。
 *
 * ! 如果 max-age 和 Expires 同时出现 max-age 优先级高
 *
 * 协商缓存
 *  当涉及到缓存机制时，强缓存优先于协商缓存。当资源的强缓存生效时，客户端可以直接从本地缓存中获取资源，而无需与服务器进行通信。强缓存的判断是通过缓存头部字段来完成的，例如设置了合适的Cache-Control和Expires字段。
 *  如果强缓存未命中（例如max-age过期），或者服务器响应中设置了Cache-Control: no-cache，则客户端会发起协商缓存的请求。在协商缓存中，客户端会发送带有缓存数据标识的请求头部字段，以向服务器验证资源的有效性。
 *  服务器会根据客户端发送的协商缓存字段（如If-Modified-Since和If-None-Match）来判断资源是否发生变化。如果资源未发生修改，服务器会返回状态码 304（Not Modified），通知客户端可以使用缓存的版本。如果资源已经发生变化，服务器将返回最新的资源，状态码为 200。
 *
 * ? 协商缓存(Last-Modified)
 *  Last-Modified 和 If-Modified-Since：服务器通过 Last-Modified 响应头告知客户端资源的最后修改时间。客户端在后续请求中通过 If-Modified-Since 请求头携带该时间，服务器判断资源是否有更新。如果没有更新，返回 304 状态码。
 *
 * ? 协商缓存(ETag)
 *  ETag 和 If-None-Match：服务器通过 ETag 响应头给资源生成一个唯一标识符。客户端在后续请求中通过 If-None-Match 请求头携带该标识符，服务器根据标识符判断资源是否有更新。如果没有更新，返回 304 状态码。
 *
 * ! ETag 优先级比 Last-Modified 高
 *
 * * 强缓存和协商缓存同时出现 浏览器优先于强缓存
 * 如何解决这个问题
 * 设置 no-cache 或者 设置 no-store 这两者不能同时出现 互斥
 * Last-Modified 设置文件最后的修改时间
 */

import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import crypto from 'node:crypto';

const app = express();

app.use(cors());

// 静态资源缓存 css js png html
app.use(
  express.static('./static', {
    maxAge: 60 * 60 * 24 * 7
  })
);

// 强缓存 Expires
app.get('/api', (req, res) => {
  res.setHeader('Expires', new Date('2025-04-02 17:02').toUTCString());
  res.send('强缓存 Expires');
});

// 强缓存 Cache-Control
// public 表示资源可以缓存，包括代理服务器 CDN
// private 表示资源只能缓存在客户端
// max-age 缓存的时间 秒
app.get('/api2', (req, res) => {
  res.setHeader('Cache-Control', 'public,max-age=5');
  res.send('强缓存 Cache-Control');
});

const getFileModifiedTime = () => {
  return fs.statSync('./index.js').mtime.toISOString();
};

// 协商缓存 Last-Modified
app.get('/api3', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  const ifModifiedSince = req.headers['if-modified-since'];
  const fileModifiedTime = getFileModifiedTime();
  console.log(ifModifiedSince, fileModifiedTime, ifModifiedSince === fileModifiedTime);

  if (ifModifiedSince === fileModifiedTime) {
    console.log('协商缓存 Last-Modified');
    res.statusCode = 304;
    res.end();
  } else {
    console.log('文件修改时间：' + fileModifiedTime);
    res.setHeader('Last-Modified', fileModifiedTime);
    res.send('文件修改时间：' + fileModifiedTime);
  }
});

const getFileETag = () => {
  return crypto.createHash('sha256').update(fs.readFileSync('index.js')).digest('hex');
};

// 协商缓存 ETag
app.get('/api4', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  const ifNoneMatch = req.headers['if-none-match'];
  const fileETag = getFileETag();
  console.log(ifNoneMatch, fileETag, ifNoneMatch === fileETag);

  if (ifNoneMatch === fileETag) {
    console.log('协商缓存 ETag');
    res.statusCode = 304;
    res.end();
  } else {
    console.log('文件修改Hash：' + fileETag);
    res.setHeader('ETag', fileETag);
    res.send('文件修改Hash：' + fileETag);
  }
});

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
