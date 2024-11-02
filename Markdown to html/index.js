const ejs = require('ejs');
const fs = require('node:fs');
const marked = require('marked');
const browserSync = require('browser-sync');

let browser;

const startServer = () => {
  browser = browserSync.create();
  browser.init({
    server: {
      baseDir: './',
      index: 'index.html'
    }
  });
};

const init = callback => {
  const md = fs.readFileSync('README.md', 'utf-8');
  ejs.renderFile('template.ejs', { content: marked.parse(md), title: 'marked to html' }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      fs.writeFileSync('index.html', data);
      callback && callback();
    }
  });
};

fs.watchFile('README.md', (curr, prev) => {
  if (curr.mtime > prev.mtime) {
    init(() => {
      browser.reload();
    });
  }
});

init(() => {
  startServer();
});
