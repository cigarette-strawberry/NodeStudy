const crypto = require('crypto');

// 1.对称加密算法
// 双方协商定义一个密钥以及iv
// 第一个参数 algorithm 接受一个算法 如aes-256-cbc
// 第二个参数 key 接受一个密钥 32位
// 第三个参数 iv 接受一个初始化向量 16位 保证生成的密钥串每次是不一样的 密钥串缺少位数 还可以进行补码

let key = crypto.randomBytes(32);
let iv = Buffer.from(crypto.randomBytes(16));

const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
cipher.update('hello world', 'utf8', 'hex');
const result = cipher.final('hex'); // 输出密文 16进制
console.log(result);

const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
decipher.update(result, 'hex', 'utf8');
const decipherResult = decipher.final('utf8'); // 输出原文
console.log(decipherResult);

// 2.非对称加密算法
// 生成公钥私钥
// 私钥加密(私有) 公钥解密(公开)

const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048, // 长度越长越安全 越慢
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
});

// console.log(publicKey, privateKey);

// 公钥加密
const encrypt = crypto.publicEncrypt(publicKey, Buffer.from('hello world'));
console.log(encrypt.toString('hex'));

// 私钥解密
const decrypt = crypto.privateDecrypt(privateKey, encrypt);
console.log(decrypt.toString('utf8'));

// 3.哈希函数算法
// 不能被解密 因为它是单向的 不可逆的
// 并非很安全 因为具有唯一性 哈希函数存在碰撞 所以设置密码要复杂一些
// 读取文件内容 转换成md5 上传给服务器 后端拿到文件内容生成md5 跟前端md5匹配 判断校验文件的一致性和完整性

const hash = crypto.createHash('sha256'); // md5 sha1 sha256
hash.update('hello world');
const digest = hash.digest('hex');
console.log(digest);
