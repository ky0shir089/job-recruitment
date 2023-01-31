import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
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
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FiChevronDown, FiChevronUp, FiEdit2 } from "react-icons/fi";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlass,
  HiOutlinePlusCircle,
} from "react-icons/hi2";
import { useRowSelect, useSortBy, useTable } from "react-table";
import useAccessOutlet from "../hooks/useAccessOutlet";
import useOutlet from "../hooks/useOutlet";
import usePagination from "../hooks/usePagination";

const TabOutletAccess = ({ uid }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { listOutlet } = useOutlet();
  const { getAccessOutlet, addAccessOutlet, updateAccessOutlet } =
    useAccessOutlet();

  const [access, setAccess] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [lastPage2, setLastPage2] = useState(1);
  const [search, setSearch] = useState("");

  const paginationRange = usePagination({ currentPage, lastPage });
  const paginationRange2 = usePagination({
    currentPage: currentPage2,
    lastPage: lastPage2,
  });

  const CustomTable = () => {
    const data = useMemo(() => access, []);
    const columns = useMemo(
      () => [
        {
          id: "id",
          Header: "ID",
          accessor: "id",
        },
        {
          Header: "Cabang",
          accessor: "branch_name",
        },
        {
          Header: "Titik",
          accessor: "outlet_name",
        },
        {
          Header: "Status",
          accessor: "access_status",
        },
        {
          Header: "Action",
          Cell: ({ row }) => (
            <HStack spacing={2}>
              <Button
                colorScheme="twitter"
                leftIcon={<FiEdit2 />}
                size="xs"
                onClick={() =>
                  update(
                    row.values.id,
                    row.values.access_status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
                  )
                }
              >
                {row.values.access_status == "ACTIVE" ? "INACTIVE" : "ACTIVE"}
              </Button>
            </HStack>
          ),
        },
      ],
      []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data }, useSortBy);

    return (
      <>
        <TableContainer boxShadow="md">
          <Table
            {...getTableProps()}
            variant="striped"
            colorScheme="teal"
            size="sm"
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th
                      userSelect="none"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <Flex alignItems="center">
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FiChevronDown />
                          ) : (
                            <FiChevronUp />
                          )
                        ) : (
                          ""
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>

            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>

        <br />

        <Center>
          <HStack spacing={2}>
            <Button size="sm" onClick={() => setCurrentPage2(1)}>
              <HiChevronLeft />
            </Button>

            {paginationRange2?.map((pageNumber, i) => {
              if (pageNumber === "DOTS") {
                return <div key={i}>&#8230;</div>;
              }

              return (
                <Button
                  key={i}
                  colorScheme={pageNumber == currentPage2 ? "blue" : "gray"}
                  size="sm"
                  onClick={() => setCurrentPage2(pageNumber)}
                >
                  {pageNumber}
                </Button>
              );
            })}

            <Button size="sm" onClick={() => setCurrentPage2(lastPage2)}>
              <HiChevronRight />
            </Button>
          </HStack>
        </Center>
      </>
    );
  };

  const LovTable = () => {
    const data = useMemo(() => outlets, []);
    const columns = useMemo(
      () => [
        {
          Header: "Cabang",
          accessor: "branch_name",
        },
        {
          Header: "Kode Titik",
          accessor: "outlet_id",
        },
        {
          Header: "Titik",
          accessor: "outlet_name",
        },
      ],
      []
    );
    const IndeterminateCheckbox = forwardRef(
      ({ indeterminate, ...rest }, ref) => {
        const defaultRef = useRef();
        const resolvedRef = ref || defaultRef;

        useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
          <>
            <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
        );
      }
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      selectedFlatRows,
    } = useTable({ columns, data }, useRowSelect, (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    });

    const saveAccess = () => {
      let r = confirm("Apakah anda akan menambahkan data ini?");
      if (r) {
        let values = {
          user_id: uid,
          outlet_id: selectedFlatRows.map((d) => d.original.id),
          access_status: "ACTIVE",
        };
        addAccessOutlet(values).then((res) => {
          let { data } = res;
          toast({
            position: "top",
            description: data.message,
            status: "success",
            isClosable: true,
          });
          onClose();
          initialize();
        });
      }
    };

    return (
      <>
        <TableContainer boxShadow="md">
          <Table
            {...getTableProps()}
            variant="striped"
            colorScheme="teal"
            size="sm"
          >
            <Thead>
              {headerGroups.map((headerGroup) => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <Th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>

            <Tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                      );
                    })}
                  </Tr>
                );
              })}
            </Tbody>
          </Table>

          <br />

          <HStack justifyContent="space-between">
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

            <Button colorScheme="blue" onClick={saveAccess}>
              Add
            </Button>
          </HStack>
        </TableContainer>
      </>
    );
  };

  const initialize = async () => {
    await getAccessOutlet(currentPage2, uid).then((res) => {
      let { data } = res.data;
      setAccess(data.data);
      setLastPage2(data.last_page);
    });
  };

  const update = async (id, status) => {
    await updateAccessOutlet(id, status)
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

  const doSearch = async (e) => {
    if (e.keyCode == 13) {
      await listOutlet(1, search).then((res) => {
        let { data } = res.data;
        setOutlets(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  useEffect(() => {
    initialize();
    listOutlet(currentPage, search).then((res) => {
      let { data } = res.data;
      setOutlets(data.data);
      setLastPage(data.last_page);
    });
  }, [currentPage, currentPage2]);

  return (
    <>
      <HStack justifyContent="space-between" mb={4}>
        <Heading fontSize="md">List Access</Heading>

        <Button
          size="sm"
          colorScheme="green"
          leftIcon={<HiOutlinePlusCircle />}
          onClick={onOpen}
        >
          New
        </Button>
      </HStack>

      <CustomTable />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List of Value</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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

            <LovTable />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TabOutletAccess;
