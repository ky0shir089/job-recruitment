import { Box, Heading, HStack } from "@chakra-ui/react";
import FormOutlet from "../../../components/FormOutlet";
import NavBar from "../../../components/NavBar";

const NewOutlet = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Outlet</Heading>
        </HStack>

        <FormOutlet />
      </Box>
    </>
  );
};

export default NewOutlet;
