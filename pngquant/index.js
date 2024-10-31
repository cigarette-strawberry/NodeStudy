const { execSync, exec } = require('child_process');

execSync('pngquant 1.png --output test.png');
// quality 0-100 数字越大质量越高体积越大 数字越小质量越差体积越小
// speed 1-10 数字越大速度越快质量越差 数字越小速度越慢质量越好
exec('pngquant --quality=80 --speed=8 1.png --output test.png');
