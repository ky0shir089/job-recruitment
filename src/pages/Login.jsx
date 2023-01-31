import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { siteVerify, signIn } from "../hooks/useLogin";
import { userLogin } from "../features/userSlice";
import { userToken } from "../features/tokenSlice";

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [token, setToken] = useState();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);

  const onVerify = useCallback(async (token) => {
    setToken(token);
  }, []);

  const initialValues = {
    uid: "",
    password: "",
  };

  const validationSchema = yup.object({
    uid: yup.string().min(4).required().trim(),
    password: yup.string().required().min(8).trim(),
  });

  const onSubmit = async (values) => {
    await siteVerify(token).then(async (res) => {
      let data = res.data;

      if (data.success && data.score > 0.5) {
        await signIn(values)
          .then((res) => {
            let { data } = res.data;

            dispatch(userToken(res.data.access_token));
            dispatch(userLogin(data));

            toast({
              position: "top",
              description: `Selamat Datang ${data.name}`,
              status: "success",
              isClosable: true,
            });

            if (data.chpass == "YES") {
              navigate("/profile");
              toast({
                position: "top",
                description: "Silahkan ubah password terlebih dahulu",
                status: "success",
                isClosable: true,
              });
            } else {
              navigate("/");
            }
          })
          .catch((error) => {
            let responses = error.response.data;
            toast({
              position: "top",
              description: responses.message,
              status: "error",
              isClosable: true,
            });
          });
      } else {
        toast({
          position: "top",
          description: "BOT DETECTED",
          status: "error",
          isClosable: true,
        });
      }
    });

    setRefreshReCaptcha((r) => !r);
  };

  return (
    <>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"}>
          <Stack align={"center"}>
            <Heading fontSize={{ base: "3xl", sm: "4xl" }}>
              Sign in to your account
            </Heading>

            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>

          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(props) => (
                <Form autoComplete="off">
                  <Stack spacing={4}>
                    <Field name="uid">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.uid && form.touched.uid}
                        >
                          <FormLabel>User ID</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="User ID"
                            rounded="lg"
                          />
                          <FormErrorMessage>{form.errors.uid}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                        >
                          <FormLabel>Password</FormLabel>
                          <InputGroup size="md">
                            <Input
                              {...field}
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                              rounded="lg"
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                onClick={handleClick}
                              >
                                {show ? "Hide" : "Show"}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <br />

                    <GoogleReCaptchaProvider
                      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_KEY}
                    >
                      <GoogleReCaptcha
                        onVerify={onVerify}
                        refreshReCaptcha={refreshReCaptcha}
                      />

                      <Button
                        type="submit"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        isLoading={props.isSubmitting}
                      >
                        Sign in
                      </Button>
                    </GoogleReCaptchaProvider>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
