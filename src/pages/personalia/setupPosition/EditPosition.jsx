import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormPosition from "../../../components/FormPosition";
import NavBar from "../../../components/NavBar";
import usePosition from "../../../hooks/usePosition";

const EditPosition = () => {
  const { id } = useParams();
  
  const { showPosition } = usePosition();
  
  const [position, setPosition] = useState([]);

  useEffect(() => {
    showPosition(id).then((res) => {
      let { data } = res.data;
      setPosition(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Posisi</Heading>
        </HStack>

        <FormPosition id={id} data={position} />
      </Box>
    </>
  );
};

export default EditPosition;
