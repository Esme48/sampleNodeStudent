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
 
  if (!loggedOnUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No user logged in" });
  }

  if (!loggedOnUser.tasklist) {
    loggedOnUser.tasklist = [];
  }

  value.id = taskCounter(); 
  loggedOnUser.tasklist.push(value);

  res.status(StatusCodes.CREATED).json(value); 
};



const getAllTasks = async (req, res) => {
  try {
    const loggedOnUser = getLoggedOnUser();
    if (!loggedOnUser) {
      return res.status(401).json({ message: "No user logged in" });
    }
    res.status(200).json(loggedOnUser.tasklist || []);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};


const getTaskById = async (req, res) => {
  try {
    const loggedOnUser = getLoggedOnUser();

    if (!loggedOnUser) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No user logged in" });
    }

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
  if (!req.body) req.body = {}; 

  const { error, value } = patchTaskSchema.validate(req.body, { abortEarly: false });

  if (error) { 
    return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }

  const loggedOnUser = getLoggedOnUser();
  if (!loggedOnUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No user logged in" });
  }

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

  if (!loggedOnUser) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: "No user logged in" });
  }

  if (loggedOnUser.tasklist) {  
    const taskIndex = loggedOnUser.tasklist.findIndex((task) => task.id === taskToFind);
    if (taskIndex !== -1) {
      const task = loggedOnUser.tasklist[taskIndex];
      loggedOnUser.tasklist.splice(taskIndex, 1); 
      return res.json(task); 
    }
  }

  res.sendStatus(StatusCodes.NOT_FOUND); 
};


module.exports = {
  create,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
