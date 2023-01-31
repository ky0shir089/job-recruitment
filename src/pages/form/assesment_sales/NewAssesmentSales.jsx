import { Box, Heading, HStack } from "@chakra-ui/react";
import FormAssesmentSales from "../../../components/FormAssesmentSales";
import NavBar from "../../../components/NavBar";

const NewAssesmentSales = () => {
  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>New Assesment Sales</Heading>
        </HStack>

        <FormAssesmentSales />
      </Box>
    </>
  );
};

export default NewAssesmentSales;
