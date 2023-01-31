import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useQuestion from "../hooks/useQuestion";

const FormQuestion = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addQuestion, updateQuestion } = useQuestion();

  const initialValues = {
    question: data?.question || "",
    q_type: data?.q_type || "",
    options: data?.options || [],
    q_seq: data?.q_seq || "",
    q_status: data?.q_status || "",
  };

  const validationSchema = yup.object({
    question: yup.string().required().trim(),
    q_type: yup.string().required().trim(),
    q_seq: yup.string().required().trim(),
    q_status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    console.log(values);
    if (id) {
      await updateQuestion(id, values)
        .then((res) => {
          let { data } = res;
          toast({
            position: "top",
            description: data.message,
            status: "success",
            isClosable: true,
          });
          navigate(-1);
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
      await addQuestion(values)
        .then((res) => {
          let { data } = res;
          toast({
            position: "top",
            description: data.message,
            status: "success",
            isClosable: true,
          });
          navigate(-1);
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
    }
  };

  return (
    <Box boxShadow="md" rounded="lg" p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {(props) => (
          <Form autoComplete="off">
            <Stack spacing={4}>
              <Field name="question">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.question && form.touched.question}
                    isRequired
                  >
                    <FormLabel>Question</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Question"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.question}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="q_type">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.q_type && form.touched.q_type}
                    isRequired
                  >
                    <FormLabel>Type</FormLabel>
                    <Select
                      placeholder="Pilih"
                      value={field.value}
                      onChange={(e) => {
                        props.setFieldValue("q_type", e.target.value);
                        if (e.target.value == "SELECT") {
                          props.setFieldValue("options[0]", {
                            option: "",
                            point: 0,
                          });
                        }
                      }}
                    >
                      <option value="TEXT">TEXT</option>
                      <option value="SELECT">SELECT</option>
                      <option value="DATABASE">DATABASE</option>
                    </Select>
                    <FormErrorMessage>{form.errors.q_type}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {props.values.q_type == "SELECT" && (
                <Field name="options">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.options && form.touched.options}
                      isRequired
                    >
                      <FormLabel>Options</FormLabel>
                      {field.value.map((item, index) => (
                        <HStack key={index}>
                          <Input
                            my={2}
                            type="text"
                            placeholder="Opsi Jawaban"
                            rounded="lg"
                            value={item.option}
                            onChange={(e) =>
                              props.setFieldValue(
                                `options[${index}].option`,
                                e.target.value
                              )
                            }
                          />

                          <Input
                            my={2}
                            type="number"
                            placeholder="Point"
                            rounded="lg"
                            value={item.point}
                            onChange={(e) =>
                              props.setFieldValue(
                                `options[${index}].point`,
                                e.target.value
                              )
                            }
                          />

                          <IconButton
                            icon={<FiPlus />}
                            colorScheme="red"
                            onClick={() =>
                              props.setFieldValue(`options[${index + 1}]`, {
                                option: "",
                                point: "",
                              })
                            }
                          />

                          <IconButton
                            icon={<FiMinus />}
                            colorScheme="red"
                            onClick={() =>
                              props.setFieldValue(
                                props.values.options.splice(1, 1)
                              )
                            }
                          />
                        </HStack>
                      ))}
                      <FormErrorMessage>{form.errors.q_type}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              )}

              <Field name="q_seq">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.q_seq && form.touched.q_seq}
                    isRequired
                  >
                    <FormLabel>Sequence</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Sequence"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.q_seq}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="q_status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.q_status && form.touched.q_status}
                    isRequired
                  >
                    <FormLabel>Status</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>{form.errors.q_status}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <br />

              <Button
                type="submit"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={props.isSubmitting}
              >
                {id ? "Update" : "Submit"}
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormQuestion;
