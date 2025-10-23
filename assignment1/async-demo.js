const fs = require('fs');
const path = require('path');
const fsPromises = require('fs').promises;


// Write a sample file for demonstration

const filePath = path.join(__dirname, 'tmpFile.txt')

fs.writeFileSync(filePath, 'File Exists')

// 1. Callback style
fs.readFile(filePath, 'utf8', (err, fileHandle) => {
  if (err) {
    console.log('File failed to open', err)
  } else {
    console.log('File was successfully opened', fileHandle)
  }
})

  // Callback hell example (test and leave it in comments):


  // 2. Promise style
fsPromises.readFile(filePath, 'utf8')
  .then((fileHandle) => {
    console.log('File was successfully opened', fileHandle)
    return fileHandle
  })
  .catch((err) => {
    console.log('File failed to open', err)
  })

      // 3. Async/Await style
async function readFileAsync() {
  try {
    const fileHandle = await fsPromises.readFile(filePath, 'utf8')
    console.log('File opened successfully', fileHandle)
    return fileHandle
  } catch (err) {
    console.log('File failed to open', err)
  }
}

readFileAsync()