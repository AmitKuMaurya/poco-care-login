const { Router } = require("express");
const {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  upadteUserPassword,
  upadteUserProfile,
  getAllUsers,
  getAUserOnAdminsProfile,
  upadteUserRole,
  deleteUser
} = require("../controllers/user.controller");
const { isAuthenticatedUser, isAuthurized } = require("../middlewares/authentification");
const userRouter = Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/password/forgot", forgotPassword);

userRouter.put("/password/reset/:token", resetPassword);

userRouter.get("/logout", logout);

userRouter.get("/me",isAuthenticatedUser,getUserDetails);

userRouter.put("/password/update",isAuthenticatedUser,upadteUserPassword)

userRouter.put("/me/update",isAuthenticatedUser,upadteUserProfile);


// admins route
userRouter.get("/admin/users",isAuthenticatedUser,isAuthurized("admin"),getAllUsers)

userRouter.get("/admin/user/:id",isAuthenticatedUser,isAuthurized("admin"),getAUserOnAdminsProfile)

userRouter.put("/admin/user/:id",isAuthenticatedUser,upadteUserRole)

userRouter.delete("/admin/user/:id",isAuthenticatedUser,isAuthurized("admin"),deleteUser)

module.exports = { userRouter };
