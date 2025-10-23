const os = require('os');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const sampleFilesDir = path.join(__dirname, 'sample-files');
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true });
}

const otherFile = path.join(sampleFilesDir, 'demo.txt');

// OS module
console.log('Platform', os.platform())
console.log('CPU', os.cpus())
console.log('Total memory (MB)', Math.round(os.totalmem() / 1024 / 1024))

// Path module
console.log('Joined Path', otherFile)

// fs.promises API
async function writeandread() {
  try {
    await fsPromises.writeFile(otherFile, 'Welcome')
    console.log('Successful Write')

    const fileContent = await fsPromises.readFile(otherFile, 'utf8')
    console.log('Content', fileContent)
  } catch (err) {
    console.log('Error', err)
  }
}

writeandread()

// Streams for large files- log first 40 chars of each chunk

const readStream = fs.createReadStream(otherFile, { encoding: 'utf8' });

readStream.on('data', chunk => {
  console.log('Chunk (first 40 chars):', chunk.slice(0, 40));
});

readStream.on('end', () => {
  console.log('Finished reading file');
});

readStream.on('error', err => {
  console.error('Stream error:', err);
});
