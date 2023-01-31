import {
  Box,
  Button,
  Center,
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
import {
  HiChevronLeft,
  HiChevronRight,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { FiEdit2 } from "react-icons/fi";
import NavBar from "../../../components/NavBar";
import useRoleMenu from "../../../hooks/useRoleMenu";
import { useLocation, useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const RoleMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const { getRoleMenu, updateRoleMenu, deleteRoleMenu } = useRoleMenu();

  const [roleMenus, setRoleMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const paginationRange = usePagination({ currentPage, lastPage });

  const initialize = async () => {
    await getRoleMenu(currentPage).then((res) => {
      let { data } = res.data;
      setRoleMenus(data.data);
      setLastPage(data.last_page);
    });
  };

  const update = async (id, status) => {
    await updateRoleMenu(id, status)
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
          <Heading>Setup Role Menu</Heading>

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
                <Th>Role Menu ID</Th>
                <Th>Role Name</Th>
                <Th>Menu Name</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {roleMenus.map((rolemenu) => (
                <Tr key={rolemenu.id}>
                  <Td>{rolemenu.id}</Td>
                  <Td>{rolemenu.role_name}</Td>
                  <Td>{rolemenu.menu_name}</Td>
                  <Td>{rolemenu.rolemenu_status}</Td>
                  <Td>
                    <HStack spacing={2}>
                      <Button
                        colorScheme="twitter"
                        leftIcon={<FiEdit2 />}
                        size="xs"
                        onClick={() =>
                          update(
                            rolemenu.id,
                            rolemenu.rolemenu_status == "ACTIVE"
                              ? "INACTIVE"
                              : "ACTIVE"
                          )
                        }
                      >
                        {rolemenu.rolemenu_status == "ACTIVE"
                          ? "INACTIVE"
                          : "ACTIVE"}
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

export default RoleMenu;
