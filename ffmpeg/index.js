const { execSync } = require('child_process');
/**
 * 1.基本格式转换 avi gif mp4 等
 * 2.提取视频中的音频 mp3
 * 3.裁剪视频 -ss 10 -to 20
 * 4.添加水印 -vf drawtext=text="测试":fontsize=30:x=10:y=10:fontcolor=white
 * 5.删除水印 -vf delogo=w=200:h=30:x=10:y=10
 */

execSync('ffmpeg -i input.mp4 output.gif', { stdio: 'inherit' });

execSync('ffmpeg -i input.mp4 output.avi', { stdio: 'inherit' });

execSync('ffmpeg -i input.mp4 output.mp3', { stdio: 'inherit' }); // 提取音频

execSync('ffmpeg -ss 10 -to 20 -i input.mp4 output.mp4', { stdio: 'inherit' }); // 裁剪视频

execSync('ffmpeg -ss 10 -to 20 -i input.mp4 -vf drawtext=text="测试":fontsize=30:x=10:y=10:fontcolor=white output.mp4', { stdio: 'inherit' }); // 添加水印

execSync('ffmpeg -i output.mp4 -vf delogo=w=200:h=30:x=10:y=10 output1.mp4', { stdio: 'inherit' }); // 删除水印
