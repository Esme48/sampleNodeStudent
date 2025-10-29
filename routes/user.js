const express = require("express");

const router = express.Router();
const { register, logonUser, logOff } = require("../controllers/userController");

router.route("/").post(register);

router.route("/logon").post(logonUser);

router.route("/logoff").post(logOff);

module.exports = router;