const Koa = require('koa')
const app = new Koa()

const readFileSync = require('./test/readFileSync')
const readdirSync = require('./test/readdirSync')

console.log('运行')
console.log(readFileSync)
console.log(readdirSync)

// readFileSync.readFileSync()

app.use(async ctx => {
  ctx.body = 'Hello World'
})

app.listen(3000)
