import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormJob from "../../../components/FormJob";
import NavBar from "../../../components/NavBar";
import useJob from "../../../hooks/useJob";

const EditJob = () => {
  const { id } = useParams();
  
  const { showJob } = useJob();
  
  const [job, setJob] = useState([]);

  useEffect(() => {
    showJob(id).then((res) => {
      let { data } = res.data;
      setJob(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Jabatan</Heading>
        </HStack>

        <FormJob id={id} data={job} />
      </Box>
    </>
  );
};

export default EditJob;
