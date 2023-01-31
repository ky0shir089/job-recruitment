import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormFiveC from "../../../components/FormFiveC";
import NavBar from "../../../components/NavBar";
import useFiveC from "../../../hooks/useFiveC";

const EditFiveC = () => {
  const { id } = useParams();

  const { showFiveC } = useFiveC();

  const [fiveC, setFiveC] = useState([]);

  useEffect(() => {
    showFiveC(id).then((res) => {
      let { data } = res.data;
      setFiveC(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit 5C</Heading>
        </HStack>

        <FormFiveC id={id} data={fiveC} />
      </Box>
    </>
  );
};

export default EditFiveC;
