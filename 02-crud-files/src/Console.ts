import chalk from "chalk";

export class Console {
  success(message: any): void {
    console.log(chalk.green(message));
  }

  error(message: any): void {
    console.log(chalk.red(message));
  }

  info(message: any): void {
    console.log(chalk.blue(message));
  }
}
