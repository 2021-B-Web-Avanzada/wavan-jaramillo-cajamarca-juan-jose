// We can't reassign a property to an object, but we can change its value.
const person = {
  name: 'John',
  age: 30,
  isMarried: false,
}

// Accessing properties
console.log(person.name);
console.log(person['name']);

// Changing properties
person.name = 'Pete';
person['name'] = 'Mary';

// Adding properties
person.isAdmin = true;

// Deleting properties
delete person.isAdmin;

// Object methods
const john = {
  name: 'John',
  age: 30,
  isMarried: false,
  // Method
  getAge: function() {
    return this.age;
  }
}

console.log(john.getAge());

// Object class
console.log(Object.keys(john));
console.log(Object.values(john));

// Variables per value or reference
// Variables per value are called primitive values
let JohnAge = 32;
const BobAge = JohnAge; // reference is not copied, only value is copied
JohnAge =JohnAge + 1;
console.log(BobAge); // 32
console.log(JohnAge);// 33

// Variables per reference
const person1 = {
  name: 'John',
  age: 30,
};

const person2 = person1; // reference is copied
// solution
const person3 = {... person1};
const person4 = Object.assign({}, person1);
person1.name = 'Bob';
// delete person2.name;
console.log(person1.name); // 31
console.log(person2.name); // 31
console.log(person3.name); // 30
console.log(person4.name); // 30

// Clone arrays
const arr1 = [1, 2, 3];
const arr2 = [...arr1];