import { Box, Heading, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormQuestion from "../../../components/FormQuestion";
import NavBar from "../../../components/NavBar";
import useQuestion from "../../../hooks/useQuestion";

const EditQuestion = () => {
  const { id } = useParams();

  const { showQuestion } = useQuestion();

  const [question, setQuestion] = useState([]);

  useEffect(() => {
    showQuestion(id).then((res) => {
      let { data } = res.data;
      setQuestion(data);
    });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Edit Question</Heading>
        </HStack>

        <FormQuestion id={id} data={question} />
      </Box>
    </>
  );
};

export default EditQuestion;
