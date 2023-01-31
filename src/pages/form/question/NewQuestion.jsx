import { Box, Heading, HStack } from "@chakra-ui/react";
import FormQuestion from "../../../components/FormQuestion";
import NavBar from "../../../components/NavBar";

const NewQuestion = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Question</Heading>
        </HStack>

        <FormQuestion />
      </Box>
    </>
  );
};

export default NewQuestion;
