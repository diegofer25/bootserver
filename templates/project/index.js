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
    console.log('Starting the API Server')
  },
  afterStart: async ({ app, dependencies }) => {
    console.log(`API Server is Online at port ${dependencies.port}`)
  }
})

server.start()
