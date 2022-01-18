// Typescript variables
const nameTyped: string = "Juan"; // primitive type
const lastNameTyped: String = "Juan"; // object type
const ageTyped: number = 23;

// Duck Typing
const nameDuck = "Juan"; // Autocomplete type

// Any type
let nameAny: any = "Juan";

// Multiple types
let nameMultiple: string | number = "Juan";

// Interfaces
interface Person {
  name: string;
  lastName: string;
  age: number;
  salary: number;
  civilStatus: "married" | "single";
  calcTaxes: (total: number) => number;
}

const person: Person = {
  name: "Juan",
  lastName: "Jaramillo",
  age: 23,
  salary: 1000,
  civilStatus: "married",
  calcTaxes: function (total: number): number {
    return total * 0.1 + this.salary;
  },
};
