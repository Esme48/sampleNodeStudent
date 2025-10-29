const EventEmitter = require('events');
const emitter = new EventEmitter();

if (require.main === module) {
  emitter.on('time', (message) => {
    console.log('Time was received', message);
  });

  setInterval(() => {
    const currentTime = new Date().toString();
    emitter.emit('time', currentTime);
  }, 5000);
}

module.exports = emitter;
