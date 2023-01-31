import { Box, Heading, HStack } from "@chakra-ui/react";
import FormBranch from "../../../components/FormBranch";
import NavBar from "../../../components/NavBar";

const NewBranch = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Branch</Heading>
        </HStack>

        <FormBranch />
      </Box>
    </>
  );
};

export default NewBranch;
