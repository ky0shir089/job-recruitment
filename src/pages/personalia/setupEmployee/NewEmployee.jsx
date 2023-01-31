import { Box, Heading, HStack } from "@chakra-ui/react";
import FormEmployee from "../../../components/FormEmployee";
import NavBar from "../../../components/NavBar";

const NewEmployee = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Karyawan</Heading>
        </HStack>

        <FormEmployee style={{ zIndex: -1 }} />
      </Box>
    </>
  );
};

export default NewEmployee;
