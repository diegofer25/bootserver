export class Server {
  constructor ({ dependencies, routes, app }) {
    this.dependencies = dependencies
    this.app = app
    this.routes = routes
  }

  start (app) {
    this.listenMiddlewares(app)
    this.listenRoutes(app)
    this.listenServer(app)
  }

  listenMiddlewares (app) {
  }

  listenRoutes (app) {
    const { dependencies } = this
    Object.entries(this.routes).forEach(([ method, routes ]) => {
      routes.forEach(({ path, callback }) => {
        app[method](path, async (...args) => {
          (await callback)[method](dependencies, ...args)
        })
      })
    })
  }

  listenServer (app) {
    const port = process.env.PORT || 4000
    app.listen(port, function() {
      console.log(`Server is Online as port ${port}`)
    })
  }

  setDependence (name, value) {
    this.dependencies[name] = value
  }

  delDependence (name) {
    delete this.dependencies[name]
  }
}
