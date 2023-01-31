import {
  Box,
  Button,
  Center,
  Flex,
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
import { useEffect, useMemo, useState } from "react";
import { ImWhatsapp } from "react-icons/im";
import NavBar from "../../components/NavBar";
import useUpload from "../../hooks/useUpload";
import { useSortBy, useTable } from "react-table";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useSelector } from "react-redux";

const ReSendWa = () => {
  const auth = useSelector((state) => state.user.user);

  const toast = useToast();

  const { getDataExpired, sendWhatsApp, updateResend } = useUpload();

  const [applicants, setApplicants] = useState([]);

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

            {applicants.length == 0 && (
              <Tr>
                <Td colSpan={8}>
                  <Center>
                    <Heading>Tidak ada data</Heading>
                  </Center>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    );
  };

  const initialize = async () => {
    await getDataExpired().then((res) => {
      let { data } = res.data;
      setApplicants(data);
    });
  };

  const resend = async () => {
    const target = applicants
      .map(
        (item) =>
          `${item.whatsapp}|${item.name}|${item.position}|${item.source}|${
            item.penempatan
          }|${item.branch_name.toLowerCase()}`
      )
      .join(",");

    const message =
      `*Undangan Pengisian Data Diri - Warung Dana ${auth.employment.branch_name}*\n\n` +
      `Selamat sore *{name}*,\n` +
      `Saya *${auth.name} - ${auth.employment.position_name} Warung Dana*.\n\n` +
      `Saya sudah menerima CV/profil Anda untuk jabatan *{var1}* melalui Aplikasi *{var2}* untuk penempatan di *{var3}*.\n\n` +
      `Saya mengundang anda untuk mengikuti tahapan selanjutnya yaitu pengisian data diri dan kuisioner pendaftaran Warung Dana.\n\n` +
      `Silakan lengkapi data diri anda dan mengisi kuisioner pada link berikut.\n\n` +
      `Link : https://bit.ly/formwarna{var4}\n\n` +
      `Apabila telah mengisi silakan konfirmasi dengan merespons\n` +
      `*NAMA LENGKAP_SUDAH MENGISI*\n\n` +
      `Terima kasih.\n` +
      `*${auth.employment.position_name} Warung Dana ${auth.employment.branch_name}.*`;

    await sendWhatsApp(auth.fonnte_token, target, message).then((res) => {
      let ids = res.data.id;
      let targets = res.data.target;
      targets.map((item, idx) => {
        updateResend(item, ids[idx], auth.employment.employee_nik).then(
          async () => {
            toast({
              position: "top",
              description: "Pesan Terikirim",
              status: "success",
              isClosable: true,
            });
            await initialize();
          }
        );
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
          <Heading>List Pelamar</Heading>

          <Button
            colorScheme="green"
            leftIcon={<ImWhatsapp />}
            onClick={resend}
            disabled={applicants.length == 0 ? true : false}
          >
            Re-Send WA
          </Button>
        </HStack>

        <CustomTable />
      </Box>
    </>
  );
};

export default ReSendWa;
