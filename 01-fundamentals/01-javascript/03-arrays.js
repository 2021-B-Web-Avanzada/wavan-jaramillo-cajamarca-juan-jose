 const arrays = [1, 2, 3, 4, 5];

// Multiple types
const multipleTypes = [1, 'string', true, null, {name: 'John'}];

// for
for (let i = 0; i < multipleTypes.length; i++) {
    console.log(multipleTypes[i]);
}

// for in objects
const person = {
    name: 'John',
    age: 30,
    city: 'New York'
};
for (let i in person) {
    console.log(i + " : " + person[i]);
}

// push
arrays.push(6, 7, 8);

// pop
const a = arrays.pop();

// shift
const b = arrays.shift();

// unshift
arrays.unshift(0, 1, 2);

// splice
arrays.splice(2, 0, 'a', 'b', 'c');

// slice
const c = arrays.slice(2, 5);

// concat
const d = arrays.concat(['d', 'e', 'f']);

// indexOf
const e = arrays.indexOf('c');

// lastIndexOf
const f = arrays.lastIndexOf('c');

// join
const g = arrays.join('-');

// reverse
const h = arrays.reverse();

// sort
const i = arrays.sort();

// filter
const j = arrays.filter(function(item) {
    return item > 2;
});

// map
const k = arrays.map(function(item) {
    return item * 2;
});

// reduce
const l = arrays.reduce(function(total, item) {
    return total + item;
});

// reduceRight
const m = arrays.reduceRight(function(total, item) {
    return total + item;
});

// every
const n = arrays.every(function(item) {
    return item > 2;
});

// some
const o = arrays.some(function(item) {
    return item > 2;
});

// find
const p = arrays.find(function(item) {
    return item > 2;
});

// findIndex
const q = arrays.findIndex(function(item) {
    return item > 2;
});

// forEach
const r = arrays.forEach(function(item) {
    console.log(item);
});


const arreglo = [
    {
    id: 1,
    nombre: 'Adrian',
    nota: 5
    },
    {
    id: 2,
    nombre: 'Vicente',
    nota: 8
    },
    {
    id: 3,
    nombre: 'Carolina',
    nota: 14
    },
    {
    id: 4,
    nombre: 'Wendy',
    nota: 16
    },
    {
    id: 5,
    nombre: 'Andrea',
    nota: 19
    },
    {
    id: 6,
    nombre: 'Pamela',
    nota: 19
    },
    {
    id: 7,
    nombre: 'Cristian',
    nota: 20
    },
    {
    id: 8,
    nombre: 'Daniel',
    nota: 19
    },
    {
    id: 9,
    nombre: 'Lilly',
    nota: 14
    },
    {
    id: 10,
    nombre: 'Ramiro',
    nota: 12
    }
    ];


// Functions as parameters
const name = arreglo.filter(function(actualValue, actualIndex, array) {
    return actualValue.nombre === 'Adrian';
});