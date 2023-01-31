import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormEmployee from "../../../components/FormEmployee";
import NavBar from "../../../components/NavBar";
import useEmployee from "../../../hooks/useEmployee";
import useOutlet from "../../../hooks/useOutlet";

const EditEmployee = () => {
  const { id } = useParams();

  const { showEmployee } = useEmployee();
  const { showOutlet } = useOutlet();

  const [employee, setEmployee] = useState([]);
  const [outlet, setOutlet] = useState([]);

  useEffect(() => {
    showEmployee(id).then(async (res) => {
      let { data } = res.data;
      setEmployee(data);
      await showOutlet(data?.outlet_id).then((res) => {
        let { data } = res.data;
        setOutlet(data);
      });
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Karayawan</Heading>
        </HStack>

        <FormEmployee id={id} data={employee} outlet={outlet} />
      </Box>
    </>
  );
};

export default EditEmployee;
