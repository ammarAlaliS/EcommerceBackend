const express = require('express');
const { createUser, loginUserCtrl, getUsers, findUser, deleteUser, updateUser, blockUser, unBlockUser } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleawares/authMiddleWare');

const router = express.Router();


router.post("/register", createUser);
router.post("/login", loginUserCtrl);

router.get("/all-users", getUsers);
router.get("/:id", authMiddleware, isAdmin, findUser);

router.delete("/:id", deleteUser);

router.put("/update-user", authMiddleware,  updateUser);
router.put("/block-user/:id", authMiddleware, isAdmin,  blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin,  unBlockUser);


module.exports = router;