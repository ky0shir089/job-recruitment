import { Box, Heading, HStack } from "@chakra-ui/react";
import FormPosition from "../../../components/FormPosition";
import NavBar from "../../../components/NavBar";

const NewPosition = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Posisi</Heading>
        </HStack>

        <FormPosition />
      </Box>
    </>
  );
};

export default NewPosition;
