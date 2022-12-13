const Pet = require("../models/Pet");
const FormError = require("../Errors/FormError");
const petService = require("../Services/pets.service");
const userService = require("../Services/user.service");

const findAndSetPet = async (req, res, next, petId) => {
  const pet = await petService.findPetbyId(petId);
  req.pet = pet;
  next();
};

const fillPet = (req, res) => {
  res.json(req.pet);
};

const getAllPets = async (req, res) => {
  const allPets = await petService.getAllPets();
  res.json(allPets);
};

const changePetStatus = async (req, res) => {
  switch (req.body.status) {
    case "fostered":
      await req.user.fosterPet(req.pet._id);
      break;
    case "adopted":
      await req.user.adoptPet(req.pet._id);
      break;
    case "available":
      await req.user.returnPet(req.pet._id);
      break;
    default:
      throw new Error("no status");
  }
  res.json({
    status: "success",
    message: `status successfully updated to ${req.body.status}`,
  });
};

const searchPets = async (req, res, next) => {
  const query = {};
  req.body.forEach((line) => {
    switch (line.operator) {
      case "eq":
        return (query[line.field] = { $eq: line.value });
      case "neq":
        return (query[line.field] = { $ne: line.value });
      case "con":
        return (query[line.field] = { $regex: `${line.value}`, $options: "i" });
      case "more":
        return (query[line.field] = { $gt: line.value });
      case "less":
        return (query[line.field] = { $lt: line.value });
    }
  });

  const final = await Pet.find(query)
    .collation({ locale: "he", strength: 2 })
    .sort({ createdAt: "desc" });

  if (final.length > 0) return res.json(final);
  return next(
    new FormError("No Pets found. Please reset your search and try again.")
  );
};

const addPet = async (req, res) => {
  const pet = await petService.addPet(req.body);
  res.json(pet);
};

const deletePet = async (req, res) => {
  await petService.deletePetbyId(req.pet._id);
  await userService.removeThisPetfromAllUsers(req.pet._id);
  res.json({ status: "success", message: "pet deleted successfully" });
};

const updatePet = async (req, res) => {
  Object.assign(req.pet, req.body);
  await req.pet.save();
  res.json({ status: "success", message: "pet updated" });
};

module.exports = {
  findAndSetPet,
  getAllPets,
  searchPets,
  addPet,
  fillPet,
  deletePet,
  changePetStatus,
  updatePet,
};
