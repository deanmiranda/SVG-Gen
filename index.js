const inquirer = require('inquirer');
const fs = require('fs');
const Triangle = require('./lib/triangle');
const Circle = require('./lib/circle');
const Square = require('./lib/square');

function generateSVG(answers, shapeSVG) {
  const { text, textColor } = answers;
  const svgWidth = 300;
  const svgHeight = 200;

  const centerX = svgWidth / 2;
  const centerY = svgHeight / 2;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;
  svgContent += shapeSVG;

  const fontSize = 48;
  const textY = centerY + fontSize / 4;

  svgContent += `<text x="${centerX}" y="${textY}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;
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
    let shapeInstance;

    switch (shape) {
      case 'circle':
        shapeInstance = new Circle();
        break;
      case 'triangle':
        shapeInstance = new Triangle();
        break;
      case 'square':
        shapeInstance = new Square();
        break;
      default:
        throw new Error(`Unsupported shape: ${shape}`);
    }

    shapeInstance.setColor(shapeColor);

    return generateSVG(answers, shapeInstance.render());
  })
  .then((svgContent) => {
    fs.writeFile('examples/logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
