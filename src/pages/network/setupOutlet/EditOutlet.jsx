import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormOutlet from "../../../components/FormOutlet";
import NavBar from "../../../components/NavBar";
import useOutlet from "../../../hooks/useOutlet";

const EditOutlet = () => {
  const { id } = useParams();
  
  const { showOutlet } = useOutlet();
  
  const [outlet, setOutlet] = useState([]);

  useEffect(() => {
    showOutlet(id).then((res) => {
      let { data } = res.data;
      setOutlet(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Outlet</Heading>
        </HStack>

        <FormOutlet id={id} data={outlet} />
      </Box>
    </>
  );
};

export default EditOutlet;
