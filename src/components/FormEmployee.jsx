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
import useEmployee from "../hooks/useEmployee";
import useJob from "../hooks/useJob";
import usePosition from "../hooks/usePosition";
import AsyncSelect from "react-select/async";
import useOutlet from "../hooks/useOutlet";

const FormEmployee = ({ id, data, outlet }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addEmployee, updateEmployee } = useEmployee();
  const { listJob } = useJob();
  const { listPosition } = usePosition();
  const { listDepartment } = useDepartment();
  const { listOutlet } = useOutlet();

  const [jobs, setJobs] = useState([]);
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    listJob().then((res) => {
      let { data } = res.data;
      setJobs(data);
    });

    listPosition().then((res) => {
      let { data } = res.data;
      setPositions(data);
    });

    listDepartment().then((res) => {
      let { data } = res.data;
      setDepartments(data);
    });
  }, []);

  const loadOptions = async (inputValue) => {
    return await listOutlet(1, inputValue).then((res) => {
      let { data } = res.data;
      return data.data;
    });
  };

  const initialValues = {
    employee_nik: data?.employee_nik || "",
    employee_name: data?.employee_name || "",
    job_id: data?.job_id || "",
    position_id: data?.position_id || "",
    department_id: data?.department_id || "",
    outlet_id: data?.outlet_id || "",
    employee_status: data?.employee_status || "",
  };

  const validationSchema = yup.object({
    employee_nik: yup.string().required().trim(),
    employee_name: yup.string().required().trim(),
    job_id: yup.string().required().trim(),
    position_id: yup.string().required().trim(),
    department_id: yup.string().required().trim(),
    outlet_id: yup.string().required().trim(),
    employee_status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateEmployee(id, values).then((res) => {
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
      await addEmployee(values).then((res) => {
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
              <Field name="employee_nik">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.employee_nik && form.touched.employee_nik
                    }
                  >
                    <FormLabel>NIK</FormLabel>
                    <Input
                      {...field}
                      placeholder="NIK"
                      rounded="lg"
                      maxLength={6}
                      readOnly={id ? true : false}
                    />
                    <FormErrorMessage>
                      {form.errors.employee_nik}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="employee_name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.employee_name && form.touched.employee_name
                    }
                  >
                    <FormLabel>Nama Karyawan</FormLabel>
                    <Input
                      {...field}
                      placeholder="Nama Karyawan"
                      rounded="lg"
                    />
                    <FormErrorMessage>
                      {form.errors.employee_name}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="job_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.job_id && form.touched.job_id}
                  >
                    <FormLabel>Jabatan</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      {jobs.map((job) => (
                        <option key={job.id} value={job.id}>
                          {job.job_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{form.errors.job_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="position_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.position_id && form.touched.position_id
                    }
                  >
                    <FormLabel>Posisi</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      {positions.map((position) => (
                        <option key={position.id} value={position.id}>
                          {position.position_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {form.errors.position_id}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="department_id">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.department_id && form.touched.department_id
                    }
                  >
                    <FormLabel>Departemen</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.department_name}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>
                      {form.errors.department_id}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="outlet_id">
                {({ form }) => (
                  <FormControl
                    isInvalid={form.errors.outlet_id && form.touched.outlet_id}
                  >
                    <FormLabel>Outlet Name</FormLabel>
                    <AsyncSelect
                      cacheOptions
                      loadOptions={loadOptions}
                      defaultOptions
                      getOptionLabel={(option) => option.outlet_name}
                      getOptionValue={(option) => option.id}
                      value={outlet}
                      isClearable
                      onChange={(e) => props.setFieldValue("outlet_id", e?.id)}
                    />
                    <FormErrorMessage>{form.errors.outlet_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="employee_status">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.employee_status &&
                      form.touched.employee_status
                    }
                  >
                    <FormLabel>Status</FormLabel>
                    <Select {...field} placeholder="Pilih">
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                    </Select>
                    <FormErrorMessage>
                      {form.errors.employee_status}
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

export default FormEmployee;
