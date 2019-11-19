import chalk from 'chalk';

export default () => {
  console.log(
    `  ${chalk.bold('--help')} or ${chalk.bold('-h')} to see the list of commands

  ${chalk.bold('--version')} or ${chalk.bold('-v')} to see the version of bootserver

  ${chalk.bold('--controller controller-name')} or ${chalk.bold('--c controller-name')} to create a new controller`
  )
}
