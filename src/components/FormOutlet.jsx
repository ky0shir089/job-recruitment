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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useBranch from "../hooks/useBranch";
import useOutlet from "../hooks/useOutlet";

const FormOutlet = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addOutlet, updateOutlet } = useOutlet();
  const { listBranch } = useBranch();

  const [branches, setBranches] = useState();

  useEffect(() => {
    listBranch().then((res) => {
      let { data } = res.data;
      setBranches(data);
    });
  }, []);

  const initialValues = {
    outlet_id: data?.outlet_id || "",
    outlet_name: data?.outlet_name || "",
    branch_id: data?.branch_id || "",
    outlet_status: data?.outlet_status || "",
  };

  const validationSchema = yup.object({
    outlet_id: yup.string().required().trim(),
    outlet_name: yup.string().required().trim(),
    branch_id: yup.string().required().trim(),
    outlet_status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateOutlet(id, values)
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
      await addOutlet(values)
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
              <Field name="outlet_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.outlet_id && form.touched.outlet_id}
                  >
                    <FormLabel>Outlet ID</FormLabel>
                    <Input
                      {...field}
                      placeholder="Outlet ID"
                      rounded="lg"
                      maxLength={5}
                    />
                    <FormErrorMessage>{form.errors.outlet_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="outlet_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.outlet_name && form.touched.outlet_name
                    }
                  >
                    <FormLabel>Outlet Name</FormLabel>
                    <Input {...field} placeholder="Outlet Name" rounded="lg" />
                    <FormErrorMessage>
                      {form.errors.outlet_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="branch_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.branch_id && form.touched.branch_id}
                  >
                    <FormLabel>Cabang</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      {branches?.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.branch_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.branch_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="outlet_status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.outlet_status && form.touched.outlet_status
                    }
                  >
                    <FormLabel>Outlet Status</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.outlet_status}
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

export default FormOutlet;
