
const taskCounter = (() => {
  let lastTaskNumber = 0;
  return () => {
    lastTaskNumber += 1;
    return lastTaskNumber;
  };
})();

const create = async (req, res) => {
  try {
    const loggedOnUser = getLoggedOnUser();

    
    if (loggedOnUser.tasklist === undefined) {
      loggedOnUser.tasklist = [];
    }

    // Assign a unique ID to the new task
    req.body.id = taskCounter();

    // Create a new task object (copy of req.body)
    const newTask = { ...req.body };

    // Add the new task to the user's task list
    loggedOnUser.tasklist.push(newTask);

    // Send success response with the created task
    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });

  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Failed to create task" });
  }
};

const createTask = async (req, res) => {
  try {
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
};

const getAllTasks = async (req, res) => {
  try {
    res.status(200).json({ message: "List of tasks" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    res.status(200).json({ message: `Task ${req.params.id} found` });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

const updateTask = async (req, res) => {
  try {
    res.status(200).json({ message: `Task ${req.params.id} updated` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    res.status(200).json({ message: `Task ${req.params.id} deleted` });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
