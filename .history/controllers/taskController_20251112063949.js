


w
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
