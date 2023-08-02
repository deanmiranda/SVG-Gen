const inquirer = require('inquirer');
const fs = require('fs');

function generateSVG(answers) {
  const { text, textColor, shape, shapeColor } = answers;

  // Validate the shape input
  if (shape !== 'circle' && shape !== 'triangle' && shape !== 'square') {
    throw new Error(`Unsupported shape: ${shape}`);
  }

  // Create the SVG content with the specified size
  let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">`;

  // Draw the shape based on the user's input
  switch (shape) {
    case 'circle':
      svgContent += `<circle cx="150" cy="100" r="50" fill="${shapeColor}" />`;
      break;
    case 'triangle':
      svgContent += `<polygon points="150,50 100,150 200,150" fill="${shapeColor}" />`;
      break;
    case 'square':
      svgContent += `<rect x="100" y="50" width="100" height="100" fill="${shapeColor}" />`;
      break;
    default:
      throw new Error(`Unsupported shape: ${shape}`);
  }

  // Draw the text based on the user's input
  svgContent += `<text x="150" y="125" font-size="48" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">${text}</text>`;

  svgContent += `</svg>`;

  // Return the SVG content
  return svgContent;
}

inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters for the text:',
      validate: function (value) {
        // Validate that the input contains up to three characters
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
    // Process the user's input to generate the SVG content
    return generateSVG(answers);
  })
  .then((svgContent) => {
    // Write the SVG content to a file named 'logo.svg'
    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  })
  .catch((error) => {
    console.error('Error:', error);
  });
