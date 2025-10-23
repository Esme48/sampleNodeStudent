const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('time', (message) => {
    console.log('Time was received', message)
})

setInterval(() => {
    const currentTime = new Date().toString()
    emitter.emit('time', currentTime)
}, 5000)