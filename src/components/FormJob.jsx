import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useJob from "../hooks/useJob";

const FormJob = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();
  
  const { addJob, updateJob } = useJob();

  const initialValues = {
    job_name: data?.job_name || "",
    job_level: data?.job_level || "",
  };

  const validationSchema = yup.object({
    job_name: yup.string().required().trim(),
    job_level: yup.number().positive().integer().required(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateJob(id, values).then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        navigate(-1);
      });
    } else {
     await addJob(values).then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        navigate(-1);
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
              <Field name="job_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.job_name && form.touched.job_name}
                  >
                    <FormLabel>Job Name</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Job Name"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.job_name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="job_level">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.job_level && form.touched.job_level}
                  >
                    <FormLabel>Job Level</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Job Level"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.job_level}</FormErrorMessage>
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

export default FormJob;
