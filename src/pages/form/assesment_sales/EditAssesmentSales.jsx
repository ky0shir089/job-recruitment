import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormAssesmentSales from "../../../components/FormAssesmentSales";
import NavBar from "../../../components/NavBar";
import useAssesmentSales from "../../../hooks/useAssesmentSales";

const EditAssesmentSales = () => {
  const { id } = useParams();

  const { showAssesmentSales } = useAssesmentSales();

  const [assesmentSales, setAssesmentSales] = useState([]);

  useEffect(() => {
    showAssesmentSales(id).then((res) => {
      let { data } = res.data;
      setAssesmentSales(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Assesment Sales</Heading>
        </HStack>

        <FormAssesmentSales id={id} data={assesmentSales} />
      </Box>
    </>
  );
};

export default EditAssesmentSales;
