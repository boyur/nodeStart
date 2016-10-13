var http = require('http'),
  fs = require('fs'),
  url = require('url'),
  path = require('path'),
  typeMime = {
    '.html': 'text/html',
    '.htm': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ttf': 'application/ttf',
    '.eot': 'application/font-eot',
    '.otf': 'font/opentype',
    '.woff': 'application/x-font-wof',
    '.woff2': 'application/font-woff2'
  };
http.createServer(function (req, res) {
  var _url = url.parse(req.url),
    filename = 'public/' + _url.pathname.substring(1),
    extname,
    type,
    img,
    font;
  if (_url.pathname === '/') {
    filename = 'public/index.html';
  }
  extname = path.extname(filename);
  type = typeMime[path.extname(filename)];

  if ((extname === '.png') || (extname === '.jpg')) {
    img = fs.readFileSync(filename);
    res.writeHead(200, {
      'Content-Type': type
    });
    res.write(img, 'hex');
    res.end();
  } else if ((extname === '.woff2') || (extname === '.woff') || (extname === '.ttf')) {
    font = fs.readFileSync(filename);
    res.writeHead(200, {
      'Content-Type': type
    });
    res.write(font, 'binary');
    res.end();
  } else {
    fs.readFile(filename, 'utf-8', function (err, content) {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain; charset=utf-8'
        });
        res.write(err.message);
        res.end();
      } else {
        res.writeHead(200, {
          'Content-Type': type
        });
        res.write(content);
        res.end();
      }
    })
  }
}).listen(1111);