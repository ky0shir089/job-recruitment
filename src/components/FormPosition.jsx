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
import usePosition from "../hooks/usePosition";

const FormPosition = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();
  
  const { addPosition, updatePosition } = usePosition();

  const initialValues = {
    position_name: data?.position_name || "",
  };

  const validationSchema = yup.object({
    position_name: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updatePosition(id, values).then((res) => {
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
      await addPosition(values).then((res) => {
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
              <Field name="position_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.position_name && form.touched.position_name}
                  >
                    <FormLabel>Nama Posisi</FormLabel>
                    <Input {...field} placeholder="Nama Posisi" rounded="lg" />
                    <FormErrorMessage>{form.errors.position_name}</FormErrorMessage>
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

export default FormPosition;
