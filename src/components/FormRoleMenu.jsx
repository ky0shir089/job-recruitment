import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Select from "react-select";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import useRoleMenu from "../hooks/useRoleMenu";
import useRole from "../hooks/useRole";
import { useEffect, useState } from "react";

const FormRoleMenu = () => {
  const navigate = useNavigate();

  const toast = useToast();

  const { getListMenu, addRoleMenu } = useRoleMenu();
  const { getRole } = useRole();

  const [roles, setRoles] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    getRole().then((res) => {
      let { data } = res.data;
      setRoles(data);
    });
  }, []);

  const optionRoles = roles.map((role) => {
    return {
      value: role.id,
      label: role.role_name,
    };
  });

  const optionMenus = menus.map((menu) => {
    return {
      value: menu.id,
      label: menu.menu_name,
    };
  });

  const status = [
    { value: "ACTIVE", label: "ACTIVE" },
    { value: "INACTIVE", label: "INACTIVE" },
  ];

  const initialValues = {
    role_id: "",
    menu_id: [],
    rolemenu_status: "",
  };

  const validationSchema = yup.object({
    role_id: yup.number().positive().integer().required(),
    menu_id: yup.array().min(1),
    rolemenu_status: yup.string().required(),
  });

  const onSubmit = async (values) => {
    await addRoleMenu(values).then((res) => {
      let { data } = res;
      toast({
        position: "top",
        description: data.message,
        status: "success",
        isClosable: true,
      });
      navigate(-1);
    });
  };

  return (
    <Box boxShadow="md" rounded="lg" p={4}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form autoComplete="off">
            <Stack spacing={4}>
              <Field name="role_id">
                {({ form }) => (
                  <FormControl
                    isInvalid={form.errors.role_id && form.touched.role_id}
                  >
                    <FormLabel>Role</FormLabel>
                    <Select
                      placeholder="Pilih"
                      options={optionRoles}
                      onChange={(e) => {
                        props.setFieldValue("role_id", e.value);
                        getListMenu(e.value).then((res) => {
                          let { data } = res.data;
                          setMenus(data);
                        });
                      }}
                    />
                    <FormErrorMessage>{form.errors.role_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="menu_id">
                {({ form }) => (
                  <FormControl
                    isInvalid={form.errors.menu_id && form.touched.menu_id}
                  >
                    <FormLabel>Menu</FormLabel>
                    <Select
                      placeholder="Pilih"
                      isMulti
                      options={optionMenus}
                      onChange={(e) => {
                        const values = e.map((val) => val.value);
                        props.setFieldValue("menu_id", values);
                      }}
                    />
                    <FormErrorMessage>{form.errors.menu_id}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="rolemenu_status">
                {({ form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.rolemenu_status &&
                      form.touched.rolemenu_status
                    }
                  >
                    <FormLabel>Menu Status</FormLabel>
                    <Select
                      placeholder="Pilih"
                      options={status}
                      onChange={(e) =>
                        props.setFieldValue("rolemenu_status", e.value)
                      }
                    />
                    <FormErrorMessage>
                      {form.errors.rolemenu_status}
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
                Submit
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormRoleMenu;
