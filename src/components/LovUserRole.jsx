import {
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import useUserRole from "../hooks/useUserRole";

const LovUserRole = ({ uid }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { getUserRole, getListRole, addUserRole, updateUserRole } =
    useUserRole();

  const [roles, setRoles] = useState([]);
  const [listRoles, setListRoles] = useState([]);

  const initialize = async () => {
    await getUserRole(uid).then((res) => {
      let { data } = res.data;
      setListRoles(data);
    });
  };

  useEffect(() => {
    initialize();
  }, []);

  const saveRole = async (role_id) => {
    let r = confirm("Apakah anda akan menambahkan data ini?");
    if (r) {
      await addUserRole({
        user_id: uid,
        role_id: role_id,
        user_role_status: "ACTIVE",
      }).then(async (res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        onClose();
        await initialize();
      });
    }
  };

  const update = async (id, status) => {
    await updateUserRole(id, status)
      .then(async (res) => {
        let { data } = res;
        toast({
          position: "top",
          description: data.message,
          status: "success",
          isClosable: true,
        });
        await initialize();
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
    getListRole(uid).then((res) => {
      let { data } = res.data;
      setRoles(data);
    });
  }, []);

  return (
    <>
      <HStack justifyContent="space-between" mb={4}>
        <Heading fontSize="md">List Role</Heading>

        <Button
          size="sm"
          colorScheme="green"
          leftIcon={<HiOutlinePlusCircle />}
          onClick={onOpen}
        >
          New
        </Button>
      </HStack>

      <TableContainer boxShadow="md">
        <Table variant="striped" colorScheme="teal" size="sm">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>

          <Tbody>
            {listRoles.map((list) => (
              <Tr key={list.id}>
                <Td>{list.id}</Td>
                <Td>{list.role_name}</Td>
                <Td>{list.user_role_status}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="twitter"
                      leftIcon={<FiEdit2 />}
                      size="xs"
                      onClick={() =>
                        update(
                          list.id,
                          list.user_role_status == "ACTIVE"
                            ? "INACTIVE"
                            : "ACTIVE"
                        )
                      }
                    >
                      {list.user_role_status == "ACTIVE"
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List of Value</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TableContainer boxShadow="md">
              <Table size="sm">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Role</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {roles.map((role) => (
                    <Tr
                      key={role.id}
                      cursor="pointer"
                      _hover={{
                        bg: "cyan.400",
                        color: "white",
                      }}
                      onClick={() => saveRole(role.id)}
                    >
                      <Td>{role.id}</Td>
                      <Td>{role.role_name}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LovUserRole;
