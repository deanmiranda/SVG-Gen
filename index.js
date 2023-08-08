const inquirer = require('inquirer');
const fs = require('fs');
const Triangle = require('./lib/triangle');
const Circle = require('./lib/circle');
const Square = require('./lib/square');

function generateSVG(answers, shapeSVG, shapeColor) {
  const { text, textColor } = answers;
  const svgWidth = 300;
  const svgHeight = 200;

  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}">`;

  svgContent += shapeSVG;

  let fontSize = 48;
  let textX = svgWidth / 2;
  let textY = svgHeight / 2;

  if (shapeSVG.includes('polygon')) {
    fontSize = 32; // Decrease font size for triangle
    textY = svgHeight * 0.7; // Move text down for triangle
  }

  svgContent += `<text x="${textX}" y="${textY}" font-size="${fontSize}" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;
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
    const { shape, shapeColor } = answers; // Capture shapeColor here
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

    shapeInstance.setColor(shapeColor); // Use shapeColor captured from user input

    return generateSVG(answers, shapeInstance.render(), shapeColor); // Pass shapeColor to generateSVG
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
