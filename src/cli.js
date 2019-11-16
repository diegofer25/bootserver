import clear from 'clear'
import figlet from 'figlet';
import chalk from 'chalk';

import parseArgumentsIntoOptions from './methods/parse-argument-options'
import initialQuestions from './methods/ask-initials-questions'
import { createProject } from './main';

export async function cli(args) {
  clear()
  console.log(
    chalk.yellow(
      figlet.textSync('BootServer', { horizontalLayout: 'full' })
    )
  );
  let options = parseArgumentsIntoOptions(args);
  if (options.name) {
    options = await initialQuestions(options);
    await createProject(options)
  } else {
    console.error('%s Invalid project name', chalk.red.bold('ERROR'));
  }
}
