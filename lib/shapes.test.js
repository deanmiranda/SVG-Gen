const { drawCircle, drawTriangle, drawSquare } = require('./shapes');

describe('Shape Drawing Functions', () => {
  test('drawCircle should return SVG code for a circle', () => {
    const shapeColor = 'red';
    const svgCode = drawCircle(shapeColor);
    expect(svgCode).toContain(`<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`);
  });

  test('drawTriangle should return SVG code for a triangle', () => {
    const shapeColor = 'blue';
    const svgCode = drawTriangle(shapeColor);
    expect(svgCode).toContain(`<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`);
  });

  test('drawSquare should return SVG code for a square', () => {
    const shapeColor = 'green';
    const svgCode = drawSquare(shapeColor);
    expect(svgCode).toContain(`<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`);
  });
});
