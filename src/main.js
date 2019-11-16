import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

import initGit from './methods/init-git'
import setPackageJson from './methods/set-package-json'
import copyTemplateFiles from './methods/copy-files'
import runEslint from './methods/run-eslint'

const access = promisify(fs.access);

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.name,
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
    '../../template'
  );
  options.templateDirectory = templateDir;

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'));
    process.exit(1);
  }

  const tasks = new Listr([{
      title: 'Setting project infos',
      task: () => setPackageJson(options)
    },
    {
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Initialize git',
      task: () => initGit(options),
      enabled: () => options.git,
    },
    {
      title: 'Install dependencies',
      task: () => projectInstall({
        cwd: options.targetDirectory,
      }),
      enabled: () => options.git
    }
  ]);

  await tasks.run();
  console.log('\n %s Project ready', chalk.green.bold('DONE'));
  console.log(`
    ${chalk.green('---------------------------------------------------')}
        cd ${chalk.bold(options.name)}

        ${chalk.bold('npm run dev')} - for development

        ${chalk.bold('npm run start')} - for production
    ${chalk.green('---------------------------------------------------')}
  `)
  return true;
}
