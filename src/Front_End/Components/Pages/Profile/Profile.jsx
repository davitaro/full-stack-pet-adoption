import {
  Box,
  Stack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Textarea,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../../contexts/authContext";
import { useUser } from "../../../hooks/useUser";
const moment = require("moment");

const Profile = () => {
  const { updateInfo } = useUser();
  const toast = useToast();
  const { isLoggedIn: userInfo } = useContext(AuthContext);

  return (
    <Stack
      d="flex"
      alignItems="center"
      justifyContent="center"
      as="main"
      position="fixed"
      mt="50"
      bgColor="white"
      w="100%"
      h="100vh"
      overflow="scroll"
      p={20}
    >
      <Heading mt={300}> My Profile </Heading>
      <Flex>
        <Box>Account created {moment(userInfo?.createdAt).fromNow()}</Box>
      </Flex>
      <Flex>
        {/* <Button onClick={() => convertDate()}>
          Console log converted date
        </Button> */}
        <Box>Last updated {moment(userInfo?.updatedAt).fromNow()}</Box>
      </Flex>
      {userInfo && Object.keys(userInfo).length !== 0 && (
        <Formik
          initialValues={{
            ...userInfo,
            newpassword: "",
            confirmnewpassword: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string(),
            lastName: Yup.string(),
            phoneNumber: Yup.number(),
            email: Yup.string().email("Invalid email address"),
            bio: Yup.string().notRequired(),
            newpassword: Yup.string().notRequired(),
            confirmnewpassword: Yup.string().when("newpassword", {
              is: (val) => !!val,
              then: (schema) => schema.required("Confirm your password"),
              otherwise: (schema) => schema.notRequired(),
            }),
          })}
          onSubmit={(values, actions) => {
            updateInfo.mutate(values, {
              onSettled: () => {
                actions.setSubmitting(false);
              },
              onSuccess: () => {
                toast({
                  position: "top",
                  title: "Profile Updated.",
                  description: "Awesome 👍",
                  status: "success",
                  duration: 9000,
                  isClosable: true,
                });
              },
              onError: () => {
                toast({
                  position: "top",
                  title: "Error",
                  description: "Oops, something went wrong 😳 ",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              },
            });
          }}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <Field name="firstName">
                {({ field, form }) => (
                  <FormControl isRequired>
                    <FormLabel mt={5} htmlFor="firstName">
                      First Name
                    </FormLabel>
                    <Input {...field} id="firstName" />
                    <ErrorMessage name="firstName" />
                  </FormControl>
                )}
              </Field>

              <Field name="lastName">
                {({ field, form }) => (
                  <FormControl isRequired>
                    <FormLabel mt={5} htmlFor="lastName">
                      Last Name
                    </FormLabel>
                    <Input {...field} id="lastName" />
                    <ErrorMessage name="lastName" />
                  </FormControl>
                )}
              </Field>

              <Field name="phone">
                {({ field, form }) => (
                  <FormControl isRequired>
                    <FormLabel mt={5} htmlFor="phone">
                      Phone
                    </FormLabel>
                    <Input {...field} type="number" id="phone" />
                    <ErrorMessage name="phone" />
                  </FormControl>
                )}
              </Field>

              <Field name="email">
                {({ field, form }) => (
                  <FormControl isRequired>
                    <FormLabel mt={5} htmlFor="email">
                      Email
                    </FormLabel>
                    <Input {...field} type="email" id="email" />
                    <ErrorMessage name="email" />
                  </FormControl>
                )}
              </Field>

              <Field name="bio">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel mt={5} htmlFor="bio">
                      Bio
                    </FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself!"
                      type="text"
                      id="bio"
                    />
                    <ErrorMessage name="email" />
                  </FormControl>
                )}
              </Field>

              <Field name="newpassword">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel mt={5} htmlFor="newpassword">
                      Reset Password:
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="new password"
                      type="password"
                      id="newpassword"
                    />
                    <ErrorMessage name="newpassword" />
                  </FormControl>
                )}
              </Field>

              <Field name="confirmnewpassword">
                {({ field, form }) => (
                  <FormControl>
                    <FormLabel mt={5} htmlFor="confirmnewpassword">
                      Confirm New Password:
                    </FormLabel>
                    <Input
                      {...field}
                      placeholder="retype password"
                      type="password"
                      id="confirmnewpassword"
                    />
                    <ErrorMessage name="confirmnewpassword" />
                  </FormControl>
                )}
              </Field>

              <Button
                isDisabled={Object.keys(errors).length !== 0}
                type="submit"
                mt={5}
                isLoading={isSubmitting}
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </Stack>
  );
};

export default Profile;
