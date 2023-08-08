const Triangle = require('./triangle');
const Circle = require('./circle');
const Square = require('./square');

describe('Shape Classes', () => {
  test('Triangle render() method should return SVG code with the given color', () => {
    const shape = new Triangle();
    shape.setColor('blue');
    expect(shape.render()).toEqual('<polygon points="150,18 244,182 56,182" fill="blue" />');
  });

  test('Circle render() method should return SVG code with the given color', () => {
    const shape = new Circle();
    shape.setColor('red');
    expect(shape.render()).toEqual('<circle cx="150" cy="100" r="50" fill="red" />');
  });

  test('Square render() method should return SVG code with the given color', () => {
    const shape = new Square();
    shape.setColor('green');
    expect(shape.render()).toEqual('<rect x="100" y="50" width="100" height="100" fill="green" />');
  });
});
