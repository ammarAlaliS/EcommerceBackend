const express = require('express');
const { createUser, loginUserCtrl, getUsers, findUser, deleteUser } = require('../controller/userController');
const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);

router.get("/all-users", getUsers)
router.get("/:id", findUser)

router.delete("/:id", deleteUser)

module.exports = router;