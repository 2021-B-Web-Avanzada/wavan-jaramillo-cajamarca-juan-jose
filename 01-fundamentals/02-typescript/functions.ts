const sumNumbers = (number1: number, ...moreNumbers: number[]): number => {
  return moreNumbers.reduce((a, b) => a + b, number1);
};

sumNumbers(1, 2, 3, 4, 5);

const sayHello = (name: string): string => {
  return `Hello ${name}`;
};

const voidFunction = (): void => {
  console.log("Void function");
};

const numbersArray: (number | string)[] = [1, 2, 3, "4", "5"];
