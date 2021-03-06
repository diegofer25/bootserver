import { CreateServer } from 'bootserver'

const server = CreateServer({
  dependencies: {
    testMessage: 'API is online',
    port: process.env.PORT || 4000
  },
  // Both above functions are optionals
  beforeStart: async ({ app, dependencies }) => {
    /**
     * This Function is called before routers load
     * here you can load your services like MongoDB and Redis
     * and define your middlewares with app instance for example
     *
     * Service Eg: server.setDependencie('mongodb', mongoConnection())
     * now all your router had access to this connection on dependencies
     *
     * Midleware Eg: app.use(...)
     */
    console.log('Starting the API Server')
  },
  afterStart: async ({ app, dependencies: { port } }) => {
    console.log(`API Server is Online at port ${port}`)
  }
})

server.start()
