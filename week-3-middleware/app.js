const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const dogsRouter = require('./routes/dogs');
const { ValidationError, NotFoundError, UnauthorizedError } = require('./errors');

const app = express();

app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.set('X-Request-Id', req.requestId);
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}]: ${req.method} ${req.path} (${req.requestId}) - ${duration}ms`);
    if (duration > 1000) { 
      console.warn(`WARNING: Slow request detected (${duration}ms) - ${req.method} ${req.path} (${req.requestId})`);
    }
  });
  next();
});

app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ limit: '1mb', extended: true }));



app.use((req, res, next) => {
  if (req.method === 'POST') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return next(new ValidationError('Content-Type must be application/json'));
    }
  }
  next();
});


app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use('/', dogsRouter); 

app.get('/error', (req, res, next) => {
  next(new Error('Test error'));
});

app.get('/slow', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  res.send('This was a slow response');
});

app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});


app.use((err, req, res, next) => {
  const status = err.statusCode || err.status || 500;
  const isClientError = status >= 400 && status < 500;
  const prefix = isClientError ? 'WARN' : 'ERROR';

  if (status >= 400 && status < 500) {
    console.warn(`WARN: ${err.name}: ${err.message} (${req.requestId})`);
  } else {
    console.error(`ERROR: ${err.name}: ${err.message} (${req.requestId})`);
  }

  const message = status === 500 ? 'Internal Server Error' : err.message;

  res.status(status).json({
    error: message,
    requestId: req.requestId,
  });
});




// Do not remove this line

module.exports = app; // Do not remove this line

// Do not remove this line
if (require.main === module) {
	app.listen(3000, () => console.log("Server listening on port 3000"));
}
