import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import copyRouter from './copy-files'

export default async ({ name }) => {
  const currentPath = process.cwd()
  const srcPath = `${currentPath}/src`
  const routesPath = `${srcPath}/routes`
  const pathTo = `${routesPath}/${name}.js`

  if (!fs.existsSync(pathTo)) {
    if (fs.existsSync(srcPath) && fs.existsSync(routesPath)) {

      const currentFileUrl = import.meta.url;
      const pathFrom = path.resolve(
        new URL(currentFileUrl).pathname,
        '../../../templates/router.js'
      )
      await copyRouter({ pathFrom, pathTo })
      console.log(`%s Router ${name} created with success`, chalk.green.bold('DONE'));
    } else {
      console.log('Please, execute this command at root project folder')
    }
  } else {
    console.log(
      `%s The router ${chalk.bold(name)}.js already exist at ${chalk.bold(routesPath)}`, chalk.red('ERROR')
    )
  }
}
