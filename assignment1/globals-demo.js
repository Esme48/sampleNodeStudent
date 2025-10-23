// Log __dirname and __filename
console.log('Directory:', __dirname) //Remember two underscores

console.log('File:', __filename)

// Log process ID and platform
console.log('Process ID', process.pid)

console.log('Process Platform', process.platform)

// Attach a custom property to global and log it
global.x = 'Global Property'
console.log(x)