import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormBranch from "../../../components/FormBranch";
import NavBar from "../../../components/NavBar";
import useBranch from "../../../hooks/useBranch";

const EditBranch = () => {
  const { id } = useParams();
  
  const { showBranch } = useBranch();
  
  const [branch, setBranch] = useState([]);

  useEffect(() => {
    showBranch(id).then((res) => {
      let { data } = res.data;
      setBranch(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Module</Heading>
        </HStack>

        <FormBranch id={id} data={branch} />
      </Box>
    </>
  );
};

export default EditBranch;
