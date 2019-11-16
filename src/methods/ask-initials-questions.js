import os from 'os'
import gitUserName from 'git-user-name';
import { input, confirm } from './../utils/question';

export default async (options) => {
  return {
    ...options,
    description: await input({
      message: 'Enter a description',
      default: 'A awesome bootserver api',
    }),
    keys: await input({
      message: 'Keywords (separate by comma)',
      default: 'bootserver, api',
    }),
    author: await input({
      message: 'Inform an author',
      default: gitUserName() || os.userInfo().username || '',
    }),
    license: await input({
      message: 'License',
      default: 'MIT',
    }),
    git: await confirm({
      message: 'Initialize a git repository?',
      default: true,
    })
  };
}
