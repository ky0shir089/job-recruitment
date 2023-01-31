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
import useAssesmentSales from "../hooks/useAssesmentSales";

const FormAssesmentSales = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addAssesmentSales, updateAssesmentSales } = useAssesmentSales();

  const initialValues = {
    statement: data?.statement || "",
    indicator: data?.indicator || "",
    type: data?.type || "",
    sequence: data?.sequence || "",
    status: data?.status || "",
  };

  const validationSchema = yup.object({
    statement: yup.string().required().trim(),
    indicator: yup.string().required().trim(),
    type: yup.string().required().trim(),
    sequence: yup.number().positive().integer().required(),
    status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateAssesmentSales(id, values)
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
      await addAssesmentSales(values)
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
              <Field name="statement">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.statement && form.touched.statement}
                    isRequired
                  >
                    <FormLabel>Pernyataan</FormLabel>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Pernyataan"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.statement}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              
              <Field name="indicator">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.indicator && form.touched.indicator}
                    isRequired
                  >
                    <FormLabel>Indikator</FormLabel>
                    <Select
                      {...field}
                      placeholder="Choose"
                      w="176px"
                    >
                      <option value="KEAHLIAN PENJUALAN">KEAHLIAN PENJUALAN</option>
                      <option value="PERILAKU PENJUALAN">PERILAKU PENJUALAN</option>
                      <option value="ORIENTASI PELANGGAN">ORIENTASI PELANGGAN</option>
                      <option value="ORIENTASI KOMPETITOR">ORIENTASI KOMPETITOR</option>
                      <option value="KOMITMEN ORGANISASI">KOMITMEN ORGANISASI</option>
                      <option value="KEPUASAN KERJA">KEPUASAN KERJA</option>
                    </Select>
                    <FormErrorMessage>{form.errors.indicator}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="type">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.type && form.touched.type}
                    isRequired
                  >
                    <FormLabel>Type</FormLabel>
                    <Select
                      {...field}
                      placeholder="Choose"
                      w="176px"
                    >
                      <option value="POSITIVE">POSITIVE</option>
                      <option value="NEGATIVE">NEGATIVE</option>
                    </Select>
                    <FormErrorMessage>{form.errors.type}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="sequence">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.sequence && form.touched.sequence}
                    isRequired
                  >
                    <FormLabel>Urutan</FormLabel>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Sequence"
                      rounded="lg"
                    />
                    <FormErrorMessage>{form.errors.sequence}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.status && form.touched.status}
                    isRequired
                  >
                    <FormLabel>Status</FormLabel>
                    <Select
                      {...field}
                      placeholder="Choose"
                      w="176px"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>{form.errors.type}</FormErrorMessage>
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

export default FormAssesmentSales;
