// Log __dirname and __filename
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// Log process ID and platform
console.log('Process ID:', process.pid);
console.log('Process Platform:', process.platform);

// Attach a custom property to global and log it
global.x = 'Hello, global!';
console.log('Custom global variable:', global.x); // <- test expects this exact string
