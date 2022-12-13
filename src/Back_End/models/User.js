const mongoose = require("mongoose");
const Pet = require("./Pet");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      /*get: (v) => {
        return "****" + v.split("@")[1];
      },*/
    },
    password: { type: String, required: true },
    accessLevel: { type: String, default: "user" },
    bio: { type: String, default: "What's your story?" },
    savedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    fosteredPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
    adoptedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toProfileJSON = function () {
  return {
    email: this.email,
    phone: this.phone,
    firstName: this.firstName,
    lastName: this.lastName,
    accessLevel: this.accessLevel,
    bio: this.bio,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    savedPets: this.savedPets,
    fosteredPets: this.fosteredPets,
    adoptedPets: this.adoptedPets,
  };
};

//foster pet: add pet id to user's FP & change pet status to 'fostered'
userSchema.methods.fosterPet = async function (petId) {
  this.fosteredPets.push(petId);
  await Pet.findOneAndUpdate({ _id: petId }, { status: "fostered" });
  await this.save();
};

//adopt pet: add pet id to user's AP, if in FP then remove, & change pet status to 'adopted'

userSchema.methods.adoptPet = async function (petId) {
  if (this.fosteredPets.includes(petId)) {
    this.fosteredPets = this.fosteredPets.filter(
      (pId) => pId.toString() !== petId.toString()
    );
  }
  this.adoptedPets.push(petId);
  await Pet.findOneAndUpdate({ _id: petId }, { status: "adopted" });
  await this.save();
};

//return pet: remove from user's FP or AP if it's there & change pet status to 'available'
userSchema.methods.returnPet = async function (petId) {
  const petInArray = (() => {
    if (this.fosteredPets.includes(petId)) return "fosteredPets";
    if (this.adoptedPets.includes(petId)) return "adoptedPets";
    throw new Error("Pet is not being fostered or adopted by this user.");
  })();

  this[petInArray] = this[petInArray].filter(
    (pId) => pId.toString() !== petId.toString()
  );

  await Pet.findOneAndUpdate({ _id: petId }, { status: "available" });
  await this.save();
};

const User = mongoose.model("User", userSchema);

module.exports = User;
