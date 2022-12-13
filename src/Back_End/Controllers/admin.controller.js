const adminService = require("../Services/admin.service");

const getAllUsers = async (req, res) => {
  const users = await adminService.getAllUsersAndTheirPets();
  res.json(users);
};

const setUserToDeletebyParams = async (req, res, next, userId) => {
  const user = await adminService.findUserById(userId);
  req.userToDel = user;
  next();
};

const deleteUserbyId = async (req, res) => {
  await adminService.findUserByIdAndDelete(req.userToDel._id);
  res.json({ status: "success", message: "user deleted successfully" });
};

module.exports = {
  getAllUsers,
  setUserToDeletebyParams,
  deleteUserbyId,
};
