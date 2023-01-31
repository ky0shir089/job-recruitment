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
import useUser from "../../../hooks/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const User = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { getUser, deleteUser } = useUser();

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");
  const paginationRange = usePagination({ currentPage, lastPage });

  const initialize = async () => {
    await getUser(currentPage, search).then((res) => {
      let { data } = res.data;
      setUsers(data.data);
      setLastPage(data.last_page);
    });
  };

  const doSearch = async (e) => {
    if (e.keyCode == 13) {
      await getUser(1, search).then((res) => {
        let { data } = res.data;
        setUsers(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  const destroy = async (id) => {
    await deleteUser(id)
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
          <Heading>Setup User</Heading>

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

        <TableContainer boxShadow="md">
          <Table variant="striped" colorScheme="teal" size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>User ID</Th>
                <Th>Nama</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.id}</Td>
                  <Td>{user.uid}</Td>
                  <Td>{user.name}</Td>
                  <Td>
                    <ul>
                      {user.user_roles.map((role) => (
                        <li key={role.id}>{role.role_name}</li>
                      ))}
                    </ul>
                  </Td>
                  <Td>{user.status}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FiEdit2 />}
                        size="xs"
                        onClick={() =>
                          navigate(`${location.pathname}/${user.id}/edit`)
                        }
                      >
                        Edit
                      </Button>

                      <Button
                        colorScheme="red"
                        leftIcon={<MdDelete />}
                        size="xs"
                        onClick={() => destroy(user.id)}
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

        <Center mt={4}>
          <HStack spacing={2}>
            <Button size="sm" onClick={() => setCurrentPage(1)}>
              <HiChevronLeft />
            </Button>

            {paginationRange.map((pageNumber, i) => {
              if (pageNumber === "DOTS") {
                return <div key={pageNumber}>&#8230;</div>;
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

export default User;
