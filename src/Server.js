module.exports = class Server {
  constructor ({ dependencies }) {
    this.dependencies = dependencies
  }

  async start ({ app, routes, beforeStart, afterStart }) {
    await beforeStart(this.dependencies)

    this.listenMiddlewares(app)
    this.listenRoutes(app, routes)
    this.listenServer(app)

    await beforeStart(this.dependencies)
  }

  listenMiddlewares (app) {
    // Your midleware here
    // app.use(...)
  }

  listenRoutes (app, routes) {
    const { dependencies } = this
    Object.entries(routes).forEach(([ method, routes ]) => {
      routes.forEach(({ path, callback }) => {
        app[method](path, async (...args) => {
          (await callback)[method](dependencies, ...args)
        })
      })
    })
  }

  listenServer (app) {
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
