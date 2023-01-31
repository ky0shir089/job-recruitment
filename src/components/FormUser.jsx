import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useUser from "../hooks/useUser";
import useEmployee from "../hooks/useEmployee";
import LovUserRole from "./LovUserRole";
import TabOutletAccess from "./TabOutletAccess";
// import LovOutlet from "./LovOutlet";

const FormEmployee = ({ id, data }) => {
  const navigate = useNavigate();

  const toast = useToast();

  const { addUser, updateUser } = useUser();
  const { listEmployee } = useEmployee();

  const [employees, setEmployees] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    listEmployee().then(async (res) => {
      let { data } = res.data;
      setEmployees(data);
    });
  }, []);

  const initialValues = {
    uid: data?.uid || "",
    name: data?.name || "",
    fonnte_token: data?.fonnte_token || "",
    employee_id: data?.employee_id || "",
    chpass: data?.chpass || "",
    status: data?.status || "",
  };

  const validationSchema = yup.object({
    uid: yup.string().required().trim(),
    name: yup.string().required().trim(),
    fonnte_token: yup.string().trim(),
    employee_id: yup.number().integer().positive().required(),
    chpass: yup.string().required().trim(),
    status: yup.string().required().trim(),
  });

  const onSubmit = async (values) => {
    if (id) {
      await updateUser(id, values).then((res) => {
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
      await addUser(values).then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        setUser(data.data);
        setTabIndex(1);
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
            <Tabs
              isFitted
              variant="enclosed"
              isLazy
              index={tabIndex}
              onChange={(index) => {
                (user || data) && setTabIndex(index);
              }}
            >
              <TabList mb="1em">
                <Tab _selected={{ color: "white", bg: "blue.500" }}>
                  Personal
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>
                  User Role
                </Tab>
                <Tab _selected={{ color: "white", bg: "blue.500" }}>
                  Outlet Access
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
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
                            maxLength={6}
                          />
                          <FormErrorMessage>{form.errors.uid}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel>User Name</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="User Name"
                            rounded="lg"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="fonnte_token">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.fonnte_token &&
                            form.touched.fonnte_token
                          }
                        >
                          <FormLabel>Fonnte Token</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Fonnte Token"
                            rounded="lg"
                          />
                          <FormErrorMessage>
                            {form.errors.fonnte_token}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="employee_id">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.employee_id && form.touched.employee_id
                          }
                          sx={{ display: id ? "none" : "" }}
                        >
                          <FormLabel>Nama Karyawan</FormLabel>
                          <Select {...field} placeholder="Pilih">
                            {employees.map((employee) => (
                              <option key={employee.id} value={employee.id}>
                                {employee.employee_name}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>
                            {form.errors.employee_id}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="chpass">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.chpass && form.touched.chpass}
                        >
                          <FormLabel>Ganti Password</FormLabel>
                          <Select {...field} placeholder="Pilih">
                            <option value="YES">YES</option>
                            <option value="NO">NO</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.chpass}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>

                    <Field name="status">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.status && form.touched.status}
                        >
                          <FormLabel>Status</FormLabel>
                          <Select {...field} placeholder="Pilih">
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                          </Select>
                          <FormErrorMessage>
                            {form.errors.status}
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
                </TabPanel>

                <TabPanel>
                  <LovUserRole uid={user?.id || data?.id} />
                </TabPanel>

                <TabPanel>
                  <TabOutletAccess uid={user?.id || data?.id} />
                  {/* <LovOutlet uid={user?.id || data?.id} /> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormEmployee;
