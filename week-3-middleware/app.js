const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const dogsRouter = require('./routes/dogs');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.requestId = uuidv4();
  res.set('X-Request-Id', req.requestId);

  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}]: ${req.method} ${req.path} (${req.requestId})`);

  next();
});

app.use((req, res, next) => {
  if (req.method === "POST") {
    const contentType = req.headers["content-type"];
    if (!contentType || !contentType.includes("application/json")) {
      return res.status(400).json({
        error: "POST requests must have Content-Type: application/json",
        requestId: req.requestId
      });
    }
  }
  next();
});


app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use('/', dogsRouter); 

app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({
    error: "Internal Server Error",
    requestId: req.requestId
  });
});


// Do not remove this line

module.exports = app; // Do not remove this line

// Do not remove this line
if (require.main === module) {
	app.listen(3000, () => console.log("Server listening on port 3000"));
}
