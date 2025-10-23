const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


// Write a sample file for demonstration

const sampleFilesDir = path.join(__dirname, 'sample-files');
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}


const sampleTxt = path.join(sampleFilesDir, 'sample.txt');

fs.writeFileSync(sampleTxt, 'Hello, async world!');

// 1. Callback style
fs.readFile(sampleTxt, 'utf8', (err) => {
  if (err) {
    console.log('Callback: File failed to open', err);
  } else {
    console.log('Callback: Hello, async world!');
  }
});


// 2. Promise style
fsPromises.readFile(sampleTxt, 'utf8')
  .then(fileHandle => {
    console.log('Promise: Hello, async world!');
    return fileHandle;
  })
  .catch(err => {
    console.log('Promise: File failed to open', err);
  });

// 3. Async/Await style
async function readFileAsync() {
  try {
    const fileHandle = await fsPromises.readFile(sampleTxt, 'utf8');
    console.log('Async/Await: Hello, async world!');
    return fileHandle;
  } catch (err) {
    console.log('Async/Await: File failed to open', err);
  }
}

readFileAsync();