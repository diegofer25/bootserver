const path = require('path')
const chalk = require('chalk')
const requireDir = require('require-dir');
const app = require('restify').createServer()
module.exports = ({ dependencies, beforeStart, afterStart }) => ({

  async start () {
    if (beforeStart) {
      await beforeStart({ app, dependencies: dependencies })
    }

    if (this.listenRoutes()) {
      this.listenServer()
      if (afterStart) {
        await afterStart({ app, dependencies: dependencies })
      }
    }
  },

  listenRoutes () {
    const routesPath = path.resolve(__dirname, '../../../src/routes')
    try {
      const routes = requireDir(routesPath)
      Object.entries(routes).forEach(([ fileName, methods ]) => {
        const path = fileName === 'index' ? '/' : `/${fileName}`
        Object.entries(methods.default).forEach(([ method, callback ]) => {
          app[method](path, async (...args) => {
            await callback(dependencies, ...args)
          })
        })
      })
      return true
    } catch (err) {
      console.log(
        "%s Don't exists the folder %s inside the folder %s",
        chalk.red("ERROR:"),
        chalk.bold("routes"),
        chalk.bold("src"))
      return false
    }
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
