import execa from 'execa';

export default async ({ targetDirectory }) => {
  const result = await execa('git', ['init'], {
    cwd: targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'));
  }
  return;
}
