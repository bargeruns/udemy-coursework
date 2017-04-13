const expect = require('expect');
const utils = require('./utils');

it('should add two numbers', () => {
  const res = utils.add(33,11);

  expect(res).toBe(44);
});

it('should square a number', () => {
  const res = utils.square(3);

  expect(res).toBe(9); 
});

it('should asyncAdd two numbers', (done) => {
  utils.asyncAdd(4, 3, (sum) => {
    expect(sum).toBeA('number');
    expect(sum).toBe(7);
    done();
  });
});

it('should asyncSquare a number', (done) => {
  utils.asyncSquare(5, (res) => {
    expect(res).toBe(25);
    done();
  });
});
