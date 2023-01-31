import {
  Box,
  Button,
  Heading,
  HStack,
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
import { HiOutlinePlusCircle } from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import NavBar from "../../../components/NavBar";
import useModule from "../../../hooks/useModule";
import { useLocation, useNavigate } from "react-router-dom";

const Module = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { getModule, deleteModule } = useModule();

  const [modules, setModules] = useState([]);

  const initialize = async () => {
    await getModule().then((res) => {
      let { data } = res.data;
      setModules(data);
    });
  };

  const destroy = async (id) => {
    await deleteModule(id)
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
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <HStack justifyContent="space-between" mb={4}>
          <Heading>Setup Module</Heading>

          <Button
            colorScheme="green"
            leftIcon={<HiOutlinePlusCircle />}
            onClick={() => navigate(`${location.pathname}/new`)}
          >
            New
          </Button>
        </HStack>

        <TableContainer boxShadow="md">
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>Module ID</Th>
                <Th>Module Name</Th>
                <Th>Module Icon</Th>
                <Th isNumeric>Seq</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {modules.map((module) => (
                <Tr key={module.id}>
                  <Td>{module.id}</Td>
                  <Td>{module.module_name}</Td>
                  <Td>{module.module_icon}</Td>
                  <Td isNumeric>{module.module_seq}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FiEdit2 />}
                        size="xs"
                        onClick={() =>
                          navigate(`${location.pathname}/${module.id}/edit`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        colorScheme="red"
                        leftIcon={<MdDelete />}
                        size="xs"
                        onClick={() => destroy(module.id)}
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
      </Box>
    </>
  );
};

export default Module;
