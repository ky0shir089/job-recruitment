import { Box, Heading, HStack } from "@chakra-ui/react";
import FormFiveC from "../../../components/FormFiveC";
import NavBar from "../../../components/NavBar";

const NewFiveC = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New 5C</Heading>
        </HStack>

        <FormFiveC />
      </Box>
    </>
  );
};

export default NewFiveC;
