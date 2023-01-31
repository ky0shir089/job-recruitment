import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useBranch from "../hooks/useBranch";

const FormBranch = ({ id, data }) => {
  const navigate = useNavigate();
  
  const toast = useToast();
  
  const { addBranch, updateBranch } = useBranch();

  const initialValues = {
    branch_code: data?.branch_code || "",
    branch_name: data?.branch_name || "",
    branch_status: data?.branch_status || "",
  };

  const validationSchema = yup.object({
    branch_code: yup.string().required().trim(),
    branch_name: yup.string().required().trim(),
    branch_status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateBranch(id, values)
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
      await addBranch(values)
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
              <Field name="branch_code">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.branch_code && form.touched.branch_code
                    }
                  >
                    <FormLabel>Branch Code</FormLabel>
                    <Input
                      {...field}
                      placeholder="Branch Code"
                      rounded="lg"
                      maxLength={3}
                    />
                    <FormErrorMessage>
                      {form.errors.branch_code}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="branch_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.branch_name && form.touched.branch_name
                    }
                  >
                    <FormLabel>Branch Name</FormLabel>
                    <Input {...field} placeholder="Branch Name" rounded="lg" />
                    <FormErrorMessage>
                      {form.errors.branch_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="branch_status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.branch_status && form.touched.branch_status
                    }
                  >
                    <FormLabel>Branch Status</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.branch_status}
                    </FormErrorMessage>
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

export default FormBranch;
