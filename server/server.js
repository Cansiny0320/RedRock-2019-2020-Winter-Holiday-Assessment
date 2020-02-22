const fs = require('fs'),
  url = require('url'),
  path = require('path'),
  http = require('http'),
  mime = require('mime');

const root = path.resolve(process.argv[2] || '.');
// 创建服务器:
const server = http.createServer(function (request, response) {
  // 获得URL的path,类似 '/css/bootstrap.css':
  const pathname = url.parse(request.url).pathname;
  // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
  const filepath = path.join(root, pathname);
  // 获取文件状态:
  fs.stat(filepath, function (err, stats) {
    if (err) {
      // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
    } else {
      if (stats.isFile()) {
        // 是文件
        console.log('200 ' + request.url);
        // 发送200响应:
        response.setHeader("Content-Type", mime.getType(filepath)+"; charset=utf-8");
        response.writeHead(200);
        // 将文件流导向response:
        fs.createReadStream(filepath).pipe(response);
      } else if (stats.isDirectory()) {
        let html = ''
        // 获取文件列表
        fs.readdir(filepath, function (err, files) {
          if (err) {
            console.log(err);
          } else {
            response.writeHead(200);
            response.write('<html><body><div>');
            for (let i = 0; i < files.length; i++) {
              html += '<a style="display:block" href="http://127.0.0.1:8000' +
                request.url + '/' + files[i] + '">' + files[i] + '</a>';
            }
            response.write(html);
            response.end('</div></body></html>');
          }
        })
      } else {
        // 出错了或者文件不存在:
      console.log('404 ' + request.url);
      // 发送404响应:
      response.writeHead(404);
      response.end('404 Not Found');
      }
    }
  });
});
server.listen(8000);

console.log('Server is running at http://127.0.0.1:8000/');