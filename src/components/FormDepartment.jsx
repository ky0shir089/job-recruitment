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
import useDepartment from "../hooks/useDepartment";

const FormDepartment = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { listDepartment, addDepartment, updateDepartment } = useDepartment();

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listDepartment().then((res) => {
      let { data } = res.data;
      setDepartments(data);
    });
  }, []);

  const initialValues = {
    department_name: data?.department_name || "",
    department_code: data?.department_code || "",
    department_parent_id: data?.department_parent_id || "",
  };

  const validationSchema = yup.object({
    department_name: yup.string().required().trim(),
    department_code: yup.string().required().trim(),
    department_parent_id: yup.string().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateDepartment(id, values).then((res) => {
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
      await addDepartment(values).then((res) => {
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
              <Field name="department_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.department_name &&
                      form.touched.department_name
                    }
                  >
                    <FormLabel>Nama Departemen</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Nama Departemen"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.department_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="department_code">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.department_code &&
                      form.touched.department_code
                    }
                  >
                    <FormLabel>Kode Departemen</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Kode Departemen"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.department_code}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="department_parent_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.department_parent_id &&
                      form.touched.department_parent_id
                    }
                  >
                    <FormLabel>Parent</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.department_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {form.errors.department_parent_id}
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

export default FormDepartment;
