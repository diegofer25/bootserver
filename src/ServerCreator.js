const app = require('restify').createServer()
module.exports = ({ dependencies, routes, beforeStart, afterStart }) => ({

  async start () {
    if (beforeStart) {
      await beforeStart({ app, dependencies: dependencies })
    }

    this.listenRoutes()
    this.listenServer()

    if (afterStart) {
      await afterStart({ app, dependencies: dependencies })
    }
  },

  listenRoutes () {
    Object.entries(routes).forEach(([ fileName, methods ]) => {
      const path = fileName === 'Index' ? '/' : `/${fileName.toLowerCase()}`
      Object.entries(methods).forEach(([ method, callback ]) => {
        app[method](path, async (...args) => {
          await callback(dependencies, ...args)
        })
      })
    })
  },

  listenServer () {
    app.listen(dependencies.port)
  },

  setDependence (name, value) {
    dependencies[name] = value
  },

  delDependence (name) {
    delete dependencies[name]
  }
})
