import { Server } from './src/Server'
import { createServer } from 'restify'
import * as routes from 'Routes'

const server = new Server({
  dependencies: {
    test: 'API is online'
  },
  routes
})

const app = createServer()
server.start(app)
