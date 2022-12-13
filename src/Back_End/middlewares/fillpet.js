
//don't use
const DB = require("../Controllers/db");

module.exports = (req, res, next) => {
  const pets = new DB("pets");
  const petsList = pets.get();
  req.pet = petsList.find((p) => p.id === req.params.petId);
  next();
};
