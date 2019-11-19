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

    this.listenRoutes()
    this.listenServer()

    if (this.afterStart) {
      await this.afterStart({ app, dependencies: this.dependencies })
    }
  }

  listenRoutes () {
    const { dependencies } = this
    Object.entries(this.routes).forEach(([ method, routes ]) => {
      routes.forEach(({ path, callback }) => {
        app[method](path, async (...args) => {
          (await callback)[method](dependencies, ...args)
        })
      })
    })
  }

  listenServer () {
    app.listen(this.dependencies.port)
  }

  setDependence (name, value) {
    this.dependencies[name] = value
  }

  delDependence (name) {
    delete this.dependencies[name]
  }
}
