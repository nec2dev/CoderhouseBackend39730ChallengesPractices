const user01 = 'John';
//TypeError: Assignment to constant variable.
user01 = 'Mary';

const user02 = {
    name: 'John',
};
user02.name = 'Mary';
console.log(user02.name); //Mary

