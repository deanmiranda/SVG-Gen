const inquirer = require('inquirer');
const fs = require('fs');
const { drawCircle, drawTriangle, drawSquare } = require('./lib/shapes');

function generateSVG(answers, shapeSVG) {
  const { text, textColor } = answers;
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">`;
  svgContent += shapeSVG;
  svgContent += `<text x="150" y="125" font-size="48" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;
  svgContent += `</svg>`;
  return svgContent;
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: function (value) {
        return value.length > 0 && value.length <= 3 ? true : 'Please enter up to three characters.';
      },
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter the text color (color keyword or hexadecimal number):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter the shape color (color keyword or hexadecimal number):',
    },
  ])
  .then((answers) => {
    const { shape, shapeColor } = answers;
    let shapeSVG;

    switch (shape) {
      case 'circle':
        shapeSVG = drawCircle(shapeColor);
        break;
      case 'triangle':
        shapeSVG = drawTriangle(shapeColor);
        break;
      case 'square':
        shapeSVG = drawSquare(shapeColor);
        break;
      default:
        throw new Error(`Unsupported shape: ${shape}`);
    }

    return generateSVG(answers, shapeSVG);
  })
  .then((svgContent) => {
    fs.writeFile('examples/logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Generated logo, and put it in the examples folder, open from file explorer.');
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
