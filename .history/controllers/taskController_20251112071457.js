const { StatusCodes } = require('http-status-codes');
const { taskSchema, patchTaskSchema } = require("../validation/taskSchema");

const { storedUsers, setLoggedOnUser, getLoggedOnUser } = require("../util/memoryStore");


const taskCounter = (() => {
  let lastTaskNumber = 0;
  return () => {
    lastTaskNumber += 1;
    return lastTaskNumber;
  };
})();

const create = async (req, res) => {
  if (!req.body) req.body = {}; 

  const { error, value } = taskSchema.validate(req.body, { abortEarly: false });

  if (error) { 
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }

  const loggedOnUser = getLoggedOnUser();
  if (loggedOnUser.tasklist === undefined) {
    loggedOnUser.tasklist = [];
  }

  value.id = taskCounter(); 
  loggedOnUser.tasklist.push(value);

  res.status(StatusCodes.CREATED).json(value); 
};



const getAllTasks = async (req, res) => {
  try {
    const loggedOnUser = getLoggedOnUser();
    res.status(200).json(loggedOnUser.tasklist || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const loggedOnUser = getLoggedOnUser();
    const taskId = parseInt(req.params.id);
    const task = loggedOnUser.tasklist?.find((t) => t.id === taskId);

    if (!task) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

const updateTask = async (req, res) => {
  if (!req.body) req.body = {}; // NEW: handle empty body

  const { error, value } = patchTaskSchema.validate(req.body, { abortEarly: false }); // NEW: validate

  if (error) { // NEW: return 400 if invali
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }

  const loggedOnUser = getLoggedOnUser();
  const taskId = parseInt(req.params.id);
  const task = loggedOnUser.tasklist?.find((t) => t.id === taskId);

  if (!task) {
    return res.sendStatus(StatusCodes.NOT_FOUND);
  }

  Object.assign(task, value); 
  res.status(StatusCodes.OK).json({ message: `Task ${taskId} updated`, task });
};


const deleteTask = async (req, res) => {
const taskToFind = parseInt(req.params.id);
const loggedOnUser = getLoggedOnUser();
  if (loggedOnUser.tasklist) {  // if we have a list
    const taskIndex = loggedOnUser.tasklist.findIndex((task)=> task.id === taskToFind);
    if (taskIndex != -1) {
      const task = loggedOnUser.tasklist[taskIndex];
      loggedOnUser.tasklist.splice(taskIndex, 1); // do the delete
      return res.json(task); // return the entry just deleted.  The default status code, OK, is returned.
    }
  };
  res.sendStatus(StatusCodes.NOT_FOUND); // else it's a 404.
};

module.exports = {
  create,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
