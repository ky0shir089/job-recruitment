import { Box, Heading, HStack } from "@chakra-ui/react";
import FormJob from "../../../components/FormJob";
import NavBar from "../../../components/NavBar";

const NewJob = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Jabatan</Heading>
        </HStack>

        <FormJob />
      </Box>
    </>
  );
};

export default NewJob;
