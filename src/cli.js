import fs from 'fs'
import clear from 'clear'
import figlet from 'figlet';
import chalk from 'chalk';

import parseArgumentsIntoOptions from './methods/parse-argument-options'
import showHelpList from './methods/show-help-list'
import initialQuestions from './methods/ask-initials-questions'
import createRouter from './methods/create-router'
import { createProject } from './main';

export async function cli(args) {
  clear()
  console.log(
    chalk.yellow(
      figlet.textSync('BootServer', { horizontalLayout: 'full' })
    )
  );
  try {
    let options = parseArgumentsIntoOptions(args);
    if (options.help) {
      showHelpList()
    } else if (options.version) {
      var pjson = require('./../package.json');
      console.log(chalk.bold(pjson.version));
    } else if (options.router) {
      createRouter(options)
    } else if (options.name) {
      if (!fs.existsSync(`${process.cwd()}/${options.name}`)) {
        options = await initialQuestions(options);
        await createProject(options)
      } else {
        console.error('%s Project folder already exist', chalk.red.bold('ERROR'));
      }
    } else {
      console.error('%s Invalid project name', chalk.red.bold('ERROR'));
    }
  } catch (error) {
    console.log(
      ' %s %s Closing the Bootserver',
      chalk.red(`${error}.\n`),
      chalk.blue('User --help to see the commands.\n')
    );
  }
}
