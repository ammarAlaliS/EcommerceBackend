const express = require('express');
const { createUser, loginUserCtrl, getUsers, findUser, deleteUser, updateUser } = require('../controller/userController');
const { authMiddleware } = require('../middleawares/authMiddleWare');

const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);

router.get("/all-users", getUsers)
router.get("/:id", authMiddleware, findUser)

router.delete("/:id", deleteUser)

router.put("/:id", updateUser)

module.exports = router;