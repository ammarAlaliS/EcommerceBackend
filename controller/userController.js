const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

// create user controler

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // CREATE A NEW USER
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // USER ALREADY EXISTS
    throw new Error("User Already Exists");
  };
});

// create Loggin controler

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exist or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      _id: findUser?._id,
      first_name: findUser?.first_name,
      last_name: findUser?.last_name,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

// update a user

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        role: req.body.role,
        mobile: req.body.mobile,
      },
      {
        new: true,
      }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});


// get all users

const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    throw new Error(error);
  }
});

// find a sigle user
const findUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)

    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

// delate user

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id)

    const deleteUser = await User.findByIdAndDelete(id);
    res.json({
      deleteUser,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// block a user 

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el usuario existe
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Update the isBlokend status to true

    const usuarioBloqueado = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );

    // send the right response
    res.status(200).json({
      message: "User Blocked"
    });
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).json({ error: "Algo salió mal" });
  }
});




// unblock a user

const unBlockUser = asyncHandler(async(req,res) => {
  const { id } = req.params; 
  try {
    const unBlock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked:false,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "User unBlocked",
    });
  } catch (error) {
    throw new Error(error)
  }
})

module.exports = {
  createUser,
  loginUserCtrl,
  getUsers,
  findUser,
  deleteUser,
  updateUser,
  blockUser,
  unBlockUser

};
