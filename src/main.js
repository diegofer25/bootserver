import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import { promisify } from 'util';
import execa from 'execa';
import Listr from 'listr';
import { projectInstall } from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
 return copy(options.templateDirectory, options.targetDirectory, {
   clobber: false,
 });
}

async function initGit(options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}

async function setPackageJsonInfo (options) {
  const pkg = require('./../template/package.json');
  pkg.name = options.projectName
  pkg.description = options.projectDescription
  pkg.keywords = options.projectKeys.split(',')
  pkg.author = options.projectAuthor
  pkg.license = options.projectLicense
  return await new Promise(resolve => {
    fs.writeFile(__dirname + "/../template/package.json", JSON.stringify(pkg, null, 1), function(err) {
      if (err) console.log(err)
      resolve(true)
    })
  });
}

export async function createProject(options) {
  options = {
    ...options,
    targetDirectory: options.projectName,
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
      task: () => setPackageJsonInfo(options)
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
      })
    },
  ]);

  await tasks.run();
  console.log('\n %s Project ready', chalk.green.bold('DONE'));
  console.log(`
    ${chalk.green('---------------------------------------------------')}
        cd ${chalk.bold(options.projectName)}

        ${chalk.bold('npm run dev')} - for development

        ${chalk.bold('npm run start')} - for production
    ${chalk.green('---------------------------------------------------')}
  `)
  return true;
}
