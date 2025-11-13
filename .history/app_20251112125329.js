const express = require("express");
const errorHandler = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const authMiddleware = require("./middleware/auth");

const taskRouter = require("./routes/task");

const app = express();

app.use(express.json({ limit: "1kb" }));

app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Query:", req.query);
  next();
})

app.get("/", (req, res) => {
  res.json({message: "Hello World."});
});

app.post("/testpost", (req, res) => {
  res.json({message: "everything worked."});
})

app.use("/user", userRouter);
app.use("/tasks", authMiddleware, taskRouter);

app.use(errorHandler);
app.use(notFound);

const port = process.env.PORT || 3000;
if (require.main === module) {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
}

let isShuttingDown = false;
async function shutdown() {
  if (isShuttingDown) return;
  isShuttingDown = true;
  console.log('Shutting down gracefully...');
  // Here add code as needed to disconnect gracefully from the database
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  shutdown();
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
  shutdown();
});

module.exports = app;