const Yup = require("yup");

const PetSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  name: Yup.string().required("Name is required"),
  status: Yup.string(),
  //   picture: Yup.string(),
  photographer: Yup.string(),
  credit: Yup.string(),
  site: Yup.string(),
  height: Yup.number().required("Height is required"),
  weight: Yup.number().required("Weight is required"),
  color: Yup.string(),
  bio: Yup.string(),
  hypoallergenic: Yup.string(),
  dietaryRestrictions: Yup.array()
    .min(1)
    .of(Yup.string().required())
    .required("Please choose none if this pet has no dietary restrictions"),
  breed: Yup.string().required("Breed is required"),
  credit: Yup.string(),
});

module.exports = PetSchema;
