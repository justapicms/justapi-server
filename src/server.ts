import { Server, createServer } from 'http'

import Koa from 'koa'
import Router from 'koa-router'
import body from 'koa-body'
import { FilesConfigManager } from './ConfigManager'
import { EntityCtrl } from './EntityCtrl'
import { ContentCtrl } from './ContentCtrl'
import { connect } from 'mongodb'
import { MongoDbManger } from './DbManager'

export class JustAPIServer {

  private koa: Koa
  private router: Router
  private server: Server


  constructor(private cfgManager: FilesConfigManager) {
    this.koa = new Koa()
    // TODO
    // app.proxy = true // Koa behind trusted proxy

    this.router = new Router()
    this.server = createServer()
  }

  start() {
    return connect('mongodb://localhost:27017/Just', { useUnifiedTopology: true, useNewUrlParser: true }).then((client) => {
      this.server.on('clientError', (_err, socket) => {
        socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
      });

      const entityCtrl = new EntityCtrl(this.cfgManager)
      const contentCtrl = new ContentCtrl(new MongoDbManger(client.db()))

      this.router.post('/api/:entity', (ctx) => contentCtrl.post(ctx, ctx.params.entity, ctx.request.body))
      this.router.post('/admin/entities/', (ctx) => entityCtrl.create(ctx, ctx.request.body))

      this.koa.use(body({
        json: true,
        jsonLimit: 4096,
      }))

      this.koa.use(this.router.routes())

      this.server.on('request', this.koa.callback())

      const port = process.env.NODE_PORT || 3000
      this.server.listen(port, () => {
        console.log(`justapi server started at ${port} port`)
      })
    })
  }

  // TODO server shutdown
}