const Pet = require("../models/Pet");

const findPetbyId = async (id) => {
  const pet = await Pet.findById(id);
  return pet;
};

const deletePetbyId = async (id) => {
  await Pet.findByIdAndDelete(id);
  console.log("deleted");
};

const getAllPets = async () => {
  const allPets = await Pet.find({}).sort({ createdAt: "desc" });
  return allPets;
};

const addPet = async (payload) => {
  const pet = new Pet({
    type: payload.type,
    name: payload.name,
    status: payload.status,
    photographer: payload.photographer,
    credit: payload.credit,
    site: payload.site,
    height: payload.height,
    weight: payload.weight,
    color: payload.color,
    bio: payload.bio,
    hypoallergenic: payload.hypoallergenic,
    dietaryRestrictions: payload.dietaryRestrictions,
    breed: payload.breed,
    image: payload.image,
  });
  await pet.save();
  return pet;
};

module.exports = {
  findPetbyId,
  getAllPets,
  addPet,
  deletePetbyId,
};
