const authCheck = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const router = require("express").Router();
const adminController = require("../../Controllers/admin.controller");

router.use(authCheck, isAdmin);

router.param("userId", adminController.setUserToDeletebyParams);
router.get("/users", adminController.getAllUsers);
router.delete(`/:userId`, authCheck, adminController.deleteUserbyId);

module.exports = router;
