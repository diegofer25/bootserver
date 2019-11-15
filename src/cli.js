import os from 'os'
import arg from 'arg';
import inquirer from 'inquirer';
import clear from 'clear'
import figlet from 'figlet';
import chalk from 'chalk';
import gitUserName from 'git-user-name';
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
    type: 'input',
    name: 'projectDescription',
    message: 'Enter a description',
    default: 'A awesome bootserver api',
  });
  questions.push({
    type: 'input',
    name: 'projectKeys',
    message: 'Keywords (separate by comma)',
    default: 'bootserver, api',
  });
  questions.push({
    type: 'input',
    name: 'projectAuthor',
    message: 'Inform an author',
    default: gitUserName() || os.userInfo().username || '',
  });
  questions.push({
    type: 'input',
    name: 'projectLicense',
    message: 'License',
    default: 'MIT',
  });
  questions.push({
    type: 'confirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false,
  });
  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    projectDescription: answers.projectDescription || 'A awesome bootserver api',
    projectKeys: answers.projectKeys || 'bootserver, api',
    projectAuthor: answers.projectAuthor || gitUserName() || os.userInfo().username || '',
    projectLicense: answers.projectLicense || 'MIT',
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
  if (options.projectName) {
    options = await promptForMissingOptions(options);
    await createProject(options)
  } else {
    console.error('%s Invalid project name', chalk.red.bold('ERROR'));
  }
}
