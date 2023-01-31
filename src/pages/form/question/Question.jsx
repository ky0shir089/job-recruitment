import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  HiOutlinePlusCircle,
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import NavBar from "../../../components/NavBar";
import useQuestion from "../../../hooks/useQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const Question = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const toast = useToast();

  const { getQuestion, deleteQuestion } = useQuestion();

  const [questions, setQuestion] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  const paginationRange = usePagination({ currentPage, lastPage });

  const initialize = async () => {
    await getQuestion(currentPage, search).then((res) => {
      let { data } = res.data;
      setQuestion(data.data);
      setLastPage(data.last_page);
    });
  };

  const doSearch = async (e) => {
    if (e.keyCode == 13) {
      await getQuestion(1, search).then((res) => {
        let { data } = res.data;
        setQuestion(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  const destroy = async (id) => {
    await deleteQuestion(id)
      .then((res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        initialize();
      })
      .catch((error) => {
        let responses = error.response.data;
        toast({
          position: "top",
          description: responses.message,
          status: "error",
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    initialize();
  }, [currentPage]);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Setup Question</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<HiMagnifyingGlass />}
          />
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={doSearch}
          />
        </InputGroup>

        <br />

        <TableContainer boxShadow="md">
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Question</Th>
                <Th>Sequence</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {questions.map((item) => (
                <Tr key={item.id}>
                  <Td>{item.id}</Td>
                  <Td>{item.question}</Td>
                  <Td>{item.q_seq}</Td>
                  <Td>{item.q_status}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FiEdit2 />}
                        size="xs"
                        onClick={() =>
                          navigate(`${location.pathname}/${item.id}/edit`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        colorScheme="red"
                        leftIcon={<MdDelete />}
                        size="xs"
                        onClick={() => destroy(item.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>

        <br />

        <Center>
          <HStack spacing={2}>
            <Button size="sm" onClick={() => setCurrentPage(1)}>
              <HiChevronLeft />
            </Button>

            {paginationRange.map((pageNumber, i) => {
              if (pageNumber === "DOTS") {
                return <div key={i}>&#8230;</div>;
              }

              return (
                <Button
                  key={i}
                  colorScheme={pageNumber == currentPage ? "blue" : "gray"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button size="sm" onClick={() => setCurrentPage(lastPage)}>
              <HiChevronRight />
            </Button>
          </HStack>
        </Center>
      </Box>
    </>
  );
};

export default Question;
