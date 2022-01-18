// Variables
// Mutable
let numberOne = 1;
numberOne = 'one';
var numberTwo = 2;
numberTwo = 'two';
// Immutable
const numberTree = 3;

// Variable priority order
// 1. const
// 2. let
// 3. var -> not use this

// Data types
const number = 1;
const string = 'string';
const boolean = true;
const object = {};
const array = [];
const nullValue = null;
const undefinedValue = undefined;

console.log(typeof number);
console.log(typeof string);
console.log(typeof boolean);
console.log(typeof object);
console.log(typeof array);
console.log(typeof nullValue);
console.log(typeof undefinedValue);
console.log(typeof Number('This is not a number')); // NaN
console.log(typeof Number(true)); // 1
console.log(typeof Number(false)); // 0
console.log(typeof Number(null)); // 0
console.log(typeof Number(undefined)); // NaN

// Truthy and Falsy
const truthy = true;
const falsy = false;

if ("") {
    console.log('Empty string is true');
} else {
    console.log('Empty string is false');
}

if ("juan") {
  console.log('Filled string is true');
} else {
  console.log('Filled string is false');
}

if(0) {
    console.log('0 is true');
} else {
    console.log('0 is false');
}

if(1) {
    console.log('1 is true');
} else {
    console.log('1 is false');
}

if (null) {
    console.log('null is true');
} else {
    console.log('null is false');
}

if (undefined) {
    console.log('undefined is true');
} else {
    console.log('undefined is false');
}

// Objects
const person = {
    name: 'Juan',
    age: 30,
    isAlive: true,
    address: {
        street: 'street',
        city: 'city',
        country: 'country'
    }
};
