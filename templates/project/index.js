import { Server } from 'bootserver'
import routes from 'Routes'

const server = new Server({
  routes,
  dependencies: {
    testMessage: 'API is online',
    port: process.env.PORT || 4000
  },
  beforeStart: async ({ app, dependencies }) => {
    console.log(this)
  },
  afterStart: async ({ app, dependencies }) => {
    console.log(`API is Online at port ${dependencies.port}`)
  }
})

server.start()
