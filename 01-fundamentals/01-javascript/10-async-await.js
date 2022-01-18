const asyncFunction = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        return resolve("Result");
      } else {
        return reject("Error");
      }
    }, 1000);
  })
};

const example1 = async () => {
  console.log("Example 1");
  try {
    const result = await asyncFunction();
    console.log(result);
  }
  catch {
    console.log("Error");
  }
}

example1();

//Inquirer example
const inquirer = require('inquirer');

async function askQuestions() {
  try {
    const response = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
      },
      {
        type: 'input',
        name: 'age',
        message: 'How old are you?'
      }
    ]);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

askQuestions();