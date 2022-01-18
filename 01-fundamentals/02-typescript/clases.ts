// classes
class Person {
  private _name: string;
  private _age: number;

  public static id: number = 0;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }

  get getName(): string {
    return this._name;
  }

  get getAge(): number {
    return this._age;
  }

  sayHi() {
    return `Hi, my name is ${this._name} and I'm ${this._age} years old`;
  }
}

class User extends Person {
  private _email: string;

  constructor(name: string, age: number, email: string) {
    super(name, age);
    this._email = email;
  }

  get getEmail(): string {
    return this._email;
  }

  sayHi() {
    return `Hi, my name is ${super.getName} and I'm ${
      super.getAge
    } years old and my email is ${this._email}`;
  }
}

const user1 = new User("Juan", 23, "example@example.com");

console.log(user1.sayHi());
console.log(user1.getAge);
console.log(user1.getName);
console.log(user1.getEmail);
