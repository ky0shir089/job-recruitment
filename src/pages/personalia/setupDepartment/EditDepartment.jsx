import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDepartment from "../../../components/FormDepartment";
import NavBar from "../../../components/NavBar";
import useDepartment from "../../../hooks/useDepartment";

const EditDepartment = () => {
  const { id } = useParams();
  
  const { showDepartment } = useDepartment();
  
  const [department, setDepartment] = useState([]);

  useEffect(() => {
    showDepartment(id).then((res) => {
      let { data } = res.data;
      setDepartment(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Departemen</Heading>
        </HStack>

        <FormDepartment id={id} data={department} />
      </Box>
    </>
  );
};

export default EditDepartment;
