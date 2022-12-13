import {
  Box,
  Button,
  IconButton,
  Input,
  FormControl,
  FormLabel,
  useToast,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = ({ onClose }) => {
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const handlePasswordVisibility = () => {
    setIsShowingPassword(!isShowingPassword);
  };
  return (
    <Box bgColor="white" p={0}>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid email address"),
          password: Yup.string().min(6, "Must be at least 6 characters"),
        })}
        onSubmit={(values, actions) => {
          login.mutate(values, {
            onSuccess: () => {
              toast({
                position: "top",
                title: `Welcome!`,
                description: "You are logged in.",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
              onClose();
              navigate("/");
            },
          });
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="loginemail">
                    Email
                  </FormLabel>
                  <Input
                    {...field}
                    type="email"
                    id="loginemail"
                    placeholder="email"
                  />
                  <ErrorMessage name="loginemail" />
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }) => (
                <FormControl isRequired>
                  <FormLabel mt={5} htmlFor="loginpassword">
                    Password
                  </FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={isShowingPassword ? "text" : "password"}
                      placeholder="password"
                      id="loginpassword"

                    />
                    <InputRightElement //width="4.5rem"   
                    height={'100%'} 
                                 
                    // m={1}
>
                      <IconButton
                        aria-label="Call Sage"
                        fontSize="20px"
                        icon={!isShowingPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye />}
                        onClick={() => handlePasswordVisibility()}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <ErrorMessage name="loginpassword" />
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              mt={5}
              isDisabled={Object.keys(errors).length !== 0}
              isLoading={login.isLoading}
            >
              Login{" "}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Login;
