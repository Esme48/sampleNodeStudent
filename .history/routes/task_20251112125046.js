const express = require("express");

const router = express.Router();
const {
  create,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.route("/").post(create).get(getAllTasks);


router
  .route("/:id")
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
