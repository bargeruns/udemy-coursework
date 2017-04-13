const square = x => x * x;
console.log(square(8));

const user = {
  name: 'Sean',
  sayHi: () => {
    console.log(`Hi, ${this.name}`);
  },
  sayHiAlt() {
    console.log(`Hi, I'm ${this.name}`);
  }
}

user.sayHiAlt();
