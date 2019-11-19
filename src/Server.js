const app = require('restify').createServer()
module.exports = class Server {
  constructor ({ dependencies, routes, beforeStart, afterStart }) {
    this.dependencies = dependencies
    this.routes = routes
    this.beforeStart = beforeStart
    this.afterStart = afterStart
  }

  async start () {
    if (this.beforeStart) {
      await this.beforeStart({ app, dependencies: this.dependencies })
    }

    this.listenRoutes(app, routes)
    this.listenServer(app)

    if (this.afterStart) {
      await this.afterStart({ app, dependencies: this.dependencies })
    }
  }

  listenRoutes (routes) {
    const { dependencies } = this
    Object.entries(routes).forEach(([ method, routes ]) => {
      routes.forEach(({ path, callback }) => {
        app[method](path, async (...args) => {
          (await callback)[method](dependencies, ...args)
        })
      })
    })
  }

  listenServer () {
    const port = process.env.PORT || 4000
    app.listen(this.dependencies.port)
  }

  setDependence (name, value) {
    this.dependencies[name] = value
  }

  delDependence (name) {
    delete this.dependencies[name]
  }
}
