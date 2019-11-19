import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import copyController from './copy-files'

export default async ({ name }) => {
  const currentPath = process.cwd()
  const srcPath = `${currentPath}/src`
  const controllersPath = `${srcPath}/controllers`
  const pathTo = `${controllersPath}/${name}.js`

  if (!fs.existsSync(pathTo)) {
    if (fs.existsSync(srcPath) && fs.existsSync(controllersPath)) {

      const currentFileUrl = import.meta.url;
      const pathFrom = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../../templates/controller.js'
      )
      await copyController({ pathFrom, pathTo })
      console.log(`%s Controller ${name} created with success`, chalk.green.bold('DONE'));
    } else {
      console.log('Please, execute this command at root project folder')
    }
  } else {
    console.log(
      `%s The controller ${chalk.bold(name)}.js already exist at ${chalk.bold(controllersPath)}`, chalk.red('ERROR')
    )
  }
}
