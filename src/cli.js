import arg from 'arg';
import inquirer from 'inquirer';
import clear from 'clear'
import figlet from 'figlet';
import chalk from 'chalk';
import { createProject } from './main';

function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {},
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   projectName: args._[0]
 };
}

async function promptForMissingOptions(options) {
  const questions = [];
  questions.push({
    type: 'confirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false,
  });
  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    git: options.git || answers.git,
  };
}

export async function cli(args) {
  clear()
  console.log(
    chalk.yellow(
      figlet.textSync('BootServer', { horizontalLayout: 'full' })
    )
  );
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createProject(options)
}
