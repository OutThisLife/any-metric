import * as express from 'express'

const app = express()

const server = app.use(require('./schema')(app)).listen(4000, err => {
  if (err) {
    server.close()
    throw err
  }
})

process.on('exit', () => server.close())
