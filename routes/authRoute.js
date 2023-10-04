const express = require('express');
const { createUser, loginUserCtrl, getUsers, findUser } = require('../controller/userController');
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);

router.get("/all-users", getUsers)
router.get("/:id", findUser)

module.exports = router;