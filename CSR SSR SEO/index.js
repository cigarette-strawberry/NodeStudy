const { JSDOM } = require('jsdom')
const fs = require('node:fs')

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
`)

const document = dom.window.document
const app = document.getElementById('app')

fetch('https://api.thecatapi.com/v1/images/search?limit=10&page=1')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(element => {
      const img = document.createElement('img')
      img.src = element.url
      img.style = 'width: 100px; height: 100px'
      app.appendChild(img)
    })
    // console.log(dom.serialize())
    fs.writeFileSync('../index.html', dom.serialize())
  })
