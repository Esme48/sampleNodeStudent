const os = require('os')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const sampleFilesDir = path.join(__dirname, 'sample-files')
if (!fs.existsSync(sampleFilesDir)) {
  fs.mkdirSync(sampleFilesDir, { recursive: true })
}

const otherFile = path.join(sampleFilesDir, 'demo.txt')
const largeFile = path.join(sampleFilesDir, 'largefile.txt')

// OS module
console.log('Platform:', os.platform())
console.log('CPU:', os.cpus())
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024))

// Path module
console.log('Joined path:', otherFile)

// fs.promises API
async function writeandread() {
  try {
    await fsPromises.writeFile(otherFile, 'Welcome')
    console.log('Successful Write')

    const fileContent = await fsPromises.readFile(otherFile, 'utf8')
    console.log('fs.promises read:', fileContent)
  } catch (err) {
    console.log('Error', err)
  }
}

writeandread()

// Streams for large files- log first 40 chars of each chunk


const lines = Array.from({ length: 100 }, (_, i) => `This is line number ${i + 1}\n`).join('')
fs.writeFileSync(largeFile, lines)
console.log('Large file created successfully.')

const readStream = fs.createReadStream(largeFile, { encoding: 'utf8', highWaterMark: 1024 })

readStream.on('data', chunk => {
  console.log('Read chunk:', chunk.slice(0, 40))
})

readStream.on('end', () => {
  console.log('Finished reading large file with streams')
})

readStream.on('error', err => {
  console.error('Stream error:', err)
})
