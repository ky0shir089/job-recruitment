import {
  Box,
  Button,
  Center,
  Flex,
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
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  HiChevronLeft,
  HiChevronRight,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import NavBar from "../../components/NavBar";
import useUpload from "../../hooks/useUpload";
import usePagination from "../../hooks/usePagination";
import { useSelector } from "react-redux";
import { useSortBy, useTable } from "react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Application = () => {
  const auth = useSelector((state) => state.user.user);

  const { getUpload } = useUpload();

  const [applicants, setApplicants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [search, setSearch] = useState("");

  const paginationRange = usePagination({ currentPage, lastPage });

  const CustomTable = () => {
    const data = useMemo(() => applicants, []);
    const columns = useMemo(
      () => [
        {
          Header: "Nama",
          accessor: "name",
        },
        {
          Header: "WhatsApp",
          accessor: "whatsapp",
        },
        {
          Header: "Posisi",
          accessor: "position",
        },
        {
          Header: "Sumber Loker",
          accessor: "source",
        },
        {
          Header: "Cabang",
          accessor: "branch_name",
        },
        {
          Header: "Status",
          accessor: "status",
          Cell: ({ row }) => (
            <Box
              p={1}
              bg={row.original.status == "FAILED" ? "red" : "green"}
              color="white"
              textAlign="center"
            >
              {row.original.status}
            </Box>
          ),
        },
        {
          Header: "Tgl Upload",
          accessor: "created_at",
          Cell: ({ row }) =>
            new Intl.DateTimeFormat("id-ID", {
              dateStyle: "short",
              timeStyle: "long",
              timeZone: "Asia/Jakarta",
            }).format(new Date(row.original.created_at)),
        },
        {
          Header: "Tgl Send",
          accessor: "updated_at",
          Cell: ({ row }) =>
            new Intl.DateTimeFormat("id-ID", {
              dateStyle: "short",
              timeStyle: "long",
              timeZone: "Asia/Jakarta",
            }).format(new Date(row.original.updated_at)),
        },
      ],
      []
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data }, useSortBy);

    return (
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
    );
  };

  const initialize = async () => {
    await getUpload(auth.id, currentPage, search).then((res) => {
      let { data } = res.data;
      const datas = data.data;
      setApplicants(datas);
      setLastPage(data.last_page);
    });
  };

  const doSearch = async (e) => {
    if (e.keyCode == 13) {
      await getUpload(auth.id, 1, search).then((res) => {
        let { data } = res.data;
        setApplicants(data.data);
        setLastPage(data.last_page);
      });
    }
  };

  useEffect(() => {
    initialize();
  }, [currentPage]);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <Heading>List Pelamar</Heading>

        <InputGroup my={2}>
          <InputLeftElement
            pointerEvents="none"
            children={<HiMagnifyingGlass />}
            h="full"
          />
          <Input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={doSearch}
          />
        </InputGroup>

        <CustomTable />

        <Center mt={4}>
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

export default Application;
