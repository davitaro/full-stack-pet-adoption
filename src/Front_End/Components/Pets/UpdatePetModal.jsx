import {
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  ModalHeader,
  Input,
  FormControl,
  FormLabel,
  useToast,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
  CheckboxGroup,
  Checkbox,
  IconButton,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { EditIcon } from "@chakra-ui/icons";
import usePet from "../../hooks/usePet";

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UpdatePetForm = ({ onClose, thisPet }) => {
  const { updatePet } = usePet(thisPet.id);
  const toast = useToast();

  // const isAtLeastOneChecked = useCallback((dietValues) => {
  //   dietValues.length > 0;
  // }, []);

  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{
          type: thisPet.type,
          name: thisPet.name,
          status: thisPet.status,
          picture: thisPet.picture,
          photographer: thisPet.photographer,
          credit: thisPet.credit,
          site: "http://www.unsplash.com",
          height: thisPet.height,
          weight: thisPet.weight,
          color: thisPet.color,
          bio: thisPet.bio,
          hypoallergenic: thisPet.hypoallergenic,
          dietaryRestrictions: thisPet.diet,
          breed: thisPet.breed,
        }}
        validationSchema={Yup.object({
          type: Yup.string(),
          name: Yup.string().required("Name is required"),
          status: Yup.string(),
          //picture: Yup.file(),
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
            .required(
              "Please choose none if this pet has no dietary restrictions"
            ),
          breed: Yup.string().required("Breed is required"),
        })}
        onSubmit={(values, actions) => {
          updatePet.mutate(values, {
            onSettled: () => {
              actions.setSubmitting(false);
            },
            onSuccess: () => {
              toast({
                position: "top",
                title: "Pet updated!",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              onClose();
            },
            onError: () => {
              toast({
                position: "top",
                title: "Error",
                description:
                  "There was an issue updating the pet. Please try again",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            },
          });
        }}
      >
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <Field name="type">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="type">
                    Type
                  </FormLabel>
                  <RadioGroup defaultValue={values.type} id="type">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="dog">
                        Dog
                      </Radio>
                      <Radio {...field} value="cat">
                        Cat
                      </Radio>
                      <Radio {...field} value="rabbit">
                        Rabbit
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="type" />
                </FormControl>
              )}
            </Field>

            <Field name="name">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="name">
                    Name
                  </FormLabel>
                  <Input {...field} id="name" />
                  <ErrorMessage name="name" />
                </FormControl>
              )}
            </Field>

            <Field name="height">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="height">
                    Height (cm)
                  </FormLabel>
                  <Input {...field} type="number" id="height" />
                  <ErrorMessage name="height" />
                </FormControl>
              )}
            </Field>

            <Field name="weight">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="weight">
                    Weight (kg)
                  </FormLabel>
                  <Input {...field} type="number" id="weight" />
                  <ErrorMessage name="weight" />
                </FormControl>
              )}
            </Field>

            <Field name="status">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="status">
                    Status
                  </FormLabel>
                  <RadioGroup defaultValue={values.status} id="status">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="available">
                        Available
                      </Radio>
                      <Radio {...field} value="adopted">
                        Adopted
                      </Radio>
                      <Radio {...field} value="fostered">
                        Fostered
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="status" />
                </FormControl>
              )}
            </Field>

            <Field name="picture">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="picture">
                    Photo
                  </FormLabel>
                  <Input
                    {...field}
                    type="file"
                    placeholder="upload a new image"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      toBase64(file).then((result) => {
                        setFieldValue("image", result);
                      });
                    }}
                    id="picture"
                  />
                  <ErrorMessage name="picture" />
                </FormControl>
              )}
            </Field>

            <Field name="credit">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="credit">
                    Photo Credit - name of photographer
                  </FormLabel>
                  <Input {...field} type="text" id="credit" />
                  <ErrorMessage name="credit" />
                </FormControl>
              )}
            </Field>

            <Field name="photographer">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="photographer">
                    Photo Credit - Photographer Profile
                  </FormLabel>
                  <Input {...field} type="text" id="photographer" />
                  <ErrorMessage name="photographer" />
                </FormControl>
              )}
            </Field>

            <Field name="site">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="site">
                    Photo Credit - site of photo
                  </FormLabel>
                  <Input {...field} type="text" id="site" />
                  <ErrorMessage name="site" />
                </FormControl>
              )}
            </Field>

            <Field name="color">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="color">
                    Color
                  </FormLabel>
                  <RadioGroup defaultValue={values.color} id="color">
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="brown">
                        brown
                      </Radio>
                      <Radio {...field} value="black">
                        black
                      </Radio>
                      <Radio {...field} value="white">
                        white
                      </Radio>
                      <Radio {...field} value="light brown">
                        light brown
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="color" />
                </FormControl>
              )}
            </Field>

            <Field name="hypoallergenic">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="hypoallergenic">
                    Hypoallergenic
                  </FormLabel>
                  <RadioGroup
                    defaultValue={
                      values.hypoallergenic === false ? "no" : "yes"
                    }
                    id="hypoallergenic"
                  >
                    <Stack spacing={4} direction="row">
                      <Radio {...field} value="no">
                        no
                      </Radio>
                      <Radio {...field} value="yes">
                        yes
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <ErrorMessage name="hypoallergenic" />
                </FormControl>
              )}
            </Field>

            <Field name="breed">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="breed">
                    Breed
                  </FormLabel>
                  <Input {...field} id="breed" />
                  <ErrorMessage name="breed" />
                </FormControl>
              )}
            </Field>

            <Field name="dietaryRestrictions">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="dietaryRestrictions">
                    Dietary Restrictions{" "}
                  </FormLabel>
                  <CheckboxGroup
                    id="dietaryRestrictions"
                    defaultValue={values.dietaryRestrictions}
                  >
                    <Stack
                      spacing={4}
                      gap={5}
                      justifyContent="left"
                      alignContent="left"
                      direction="row"
                      flexFlow="wrap"
                    >
                      <Checkbox {...field} value="none">
                        none
                      </Checkbox>
                      <Checkbox {...field} value="dairy">
                        dairy
                      </Checkbox>
                      <Checkbox
                        {...field}
                        value="gluten"
                        isChecked={values.dietaryRestrictions.includes(
                          "gluten"
                        )}
                      >
                        gluten
                      </Checkbox>
                      <Checkbox {...field} value="shellfish">
                        shellfish
                      </Checkbox>
                      <Checkbox {...field} value="lowSalt">
                        low salt
                      </Checkbox>
                      <Checkbox {...field} value="lowCalorie">
                        low calorie
                      </Checkbox>
                    </Stack>
                  </CheckboxGroup>{" "}
                  <ErrorMessage name="dietaryRestrictions" />
                </FormControl>
              )}
            </Field>

            <Field name="bio">
              {({ field, form }) => (
                <FormControl>
                  <FormLabel mt={5} htmlFor="bio">
                    Bio
                  </FormLabel>
                  <Textarea {...field} type="text" id="bio" />
                  <ErrorMessage name="bio" />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              mt={5}
              isDisabled={Object.keys(errors).length !== 0}
              isLoading={isSubmitting}
            >
              Update Pet{" "}
            </Button>
            {/* {JSON.stringify(errors)} */}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

const UpdatePetModal = ({ thisPet }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton onClick={onOpen} variant="ghost" colorScheme="green">
        {<EditIcon />}
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Pet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UpdatePetForm
              onClose={onClose}
              thisPet={thisPet} /*updatePet={updatePet}*/
            />{" "}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdatePetModal;
