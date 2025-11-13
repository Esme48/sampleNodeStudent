const { StatusCodes } = require('http-status-codes');
const { storedUsers, setLoggedOnUser, getLoggedOnUser } = require("../util/memoryStore");


const taskCounter = (() => {
  let lastTaskNumber = 0;
  return () => {
    lastTaskNumber += 1;
    return lastTaskNumber;
  };
})();

const create = async (req, res) => {
  const loggedOnUser = getLoggedOnUser();
    if (loggedOnUser.tasklist === undefined) {
      loggedOnUser.tasklist = [];
    }
  req.body.id = taskCounter();
  const newTask = { ...req.body };
  loggedOnUser.tasklist.push(newTask);
  res.json(newTask);
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
  try {
    const loggedOnUser = getLoggedOnUser();
    const taskId = parseInt(req.params.id);
    const task = loggedOnUser.tasklist?.find((t) => t.id === taskId);

    if (!task) {
      return res.sendStatus(StatusCodes.NOT_FOUND);
    }

    Object.assign(task, req.body);

    res.status(200).json({
      message: `Task ${taskId} updated`,
      task,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
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
