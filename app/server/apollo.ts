import * as express from 'express'

const app = express()

const server = app.use(require('./schema')).listen(3000)
process.on('exit', () => server.close())
