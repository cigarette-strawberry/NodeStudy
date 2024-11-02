const fs = require('node:fs');
const zlib = require('node:zlib');

// gzip
// 压缩 createGzip
/* const readStream = fs.createReadStream('test.txt');
const writeStream = fs.createWriteStream('test.txt.gz');
readStream.pipe(zlib.createGzip()).pipe(writeStream); */

// 解压 createGunzip
/* const readStream2 = fs.createReadStream('test.txt.gz');
const writeStream2 = fs.createWriteStream('test2.txt');
readStream2.pipe(zlib.createGunzip()).pipe(writeStream2); */

// deflate
// 压缩 createDeflateRaw
/* const readStream = fs.createReadStream('test.txt');
const writeStream = fs.createWriteStream('test.txt.deflate');
readStream.pipe(zlib.createDeflate()).pipe(writeStream); */

// 解压 createGunzip
/* const readStream2 = fs.createReadStream('test.txt.deflate');
const writeStream2 = fs.createWriteStream('test2.txt');
readStream2.pipe(zlib.createInflate()).pipe(writeStream2); */
