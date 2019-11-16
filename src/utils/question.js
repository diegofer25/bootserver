import inquirer from 'inquirer';

export const input = async ({ message, default: def }) => {
  const questions = [];
  questions.push({
    type: 'input',
    name: 'awnser',
    message,
    default: def,
  });
  const { awnser } = await inquirer.prompt(questions)
  if (!awnser && def) {
    return def
  }
  return awnser;
}

export const confirm = async ({ message, default: def }) => {
  const questions = [];
  questions.push({
    type: 'confirm',
    name: 'awnser',
    message,
    default: def,
  });
  const { awnser } = await inquirer.prompt(questions)
  if (!awnser && def) {
    return def
  }
  return awnser;
}
