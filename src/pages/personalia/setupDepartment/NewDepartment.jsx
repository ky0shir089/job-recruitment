import { Box, Heading, HStack } from "@chakra-ui/react";
import FormDepartment from "../../../components/FormDepartment";
import NavBar from "../../../components/NavBar";

const NewDepartment = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Departemen</Heading>
        </HStack>

        <FormDepartment />
      </Box>
    </>
  );
};

export default NewDepartment;
