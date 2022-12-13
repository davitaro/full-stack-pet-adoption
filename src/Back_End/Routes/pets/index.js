const express = require("express");
const authCheck = require("../../middlewares/auth");
const validateForm = require("../../middlewares/validateForm");
const verifyPermissions = require("../../middlewares/verifyPermissions");
const PetSchema = require("../../Validations/PetSchema");
const petController = require("../../Controllers/pets.controller");
const isAdmin = require("../../middlewares/isAdmin");
const router = express.Router();

router.param("petId", petController.findAndSetPet);
// const pet = petService.findPetbyId(petId);
//   //   await Pet.findById(petId);
  // req.pet = pet;


router.get("/", petController.getAllPets);
router.post("/search", petController.searchPets);
router.post(
  "/",
  authCheck,
  verifyPermissions("CREATE_PET"),
  validateForm(PetSchema),
  petController.addPet
);
router.get("/:petId", petController.fillPet);
router.delete(`/:petId`, authCheck, petController.deletePet);
router.post("/:petId/status", authCheck, petController.changePetStatus);
router.put(
  "/:petId",
  authCheck,
  isAdmin,
  validateForm(PetSchema),
  petController.updatePet
);

module.exports = router;
