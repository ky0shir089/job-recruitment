import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../components/NavBar";
import useUpload from "../../hooks/useUpload";

const Upload = () => {
  const auth = useSelector((state) => state.user.user);

  const {
    addUpload,
    updateUpload,
    sendWhatsApp,
    validateWhatsApp,
    validation,
  } = useUpload();

  const [device, setDevice] = useState("");
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [success, setSuccess] = useState(0);
  const [fail, setFail] = useState(0);
  const [loading, setLoading] = useState(false);

  const upload = async (file) => {
    if (!file) return;

    setLoading(true);

    const values = {
      nik: auth.employment.employee_nik,
      outlet_id: auth.employment.outlet_id,
      file: file,
    };

    const message =
      `*Undangan Pengisian Data Diri - Warung Dana ${auth.employment.branch_name}*\n\n` +
      `Selamat sore *{name}*,\n` +
      `Saya *${auth.name} - ${auth.employment.position_name} Warung Dana*.\n\n` +
      `Saya sudah menerima CV/profil Anda untuk jabatan *{var1}* melalui Aplikasi *{var2}* untuk penempatan di *{var3}*.\n\n` +
      `Saya mengundang anda untuk mengikuti tahapan selanjutnya yaitu pengisian data diri dan kuisioner pendaftaran Warung Dana.\n\n` +
      `Silakan lengkapi data diri anda dan mengisi kuisioner pada link berikut.\n\n` +
      `Link          : https://recruitment.warungdana.com\n` +
      `Username: {var4}\n` +
      `Password : {var5}\n` +
      `Referral    : {var6}\n\n` +
      `Apabila telah mengisi silakan konfirmasi dengan merespons\n` +
      `*NAMA LENGKAP_SUDAH MENGISI*\n\n` +
      `Terima kasih.\n` +
      `*${auth.employment.position_name} Warung Dana ${auth.employment.branch_name}.*`;

    await addUpload(values)
      .then(async (res) => {
        let { data } = res;
        const datas = data.data;
        setSuccess(data.success);
        setResults(data.result_set);

        let target = datas
          .map(
            (item) =>
              `${item.whatsapp}|${item.name}|${item.position}|${item.source}|${
                item.penempatan
              }|${item.whatsapp.replace(62, 0)}|${item.password}|${
                item.referral
              }`
          )
          .join(",");
        await sendWhatsApp(auth.fonnte_token, target, message).then((res) => {
          let ids = res.data.id;
          datas.map((item, idx) => {
            updateUpload(item.whatsapp, ids[idx]);
          });
        });

        let phoneNumber = datas.map((item) => item.whatsapp).join(",");
        await validateWhatsApp(auth.fonnte_token, phoneNumber).then(
          async (res) => {
            let data = res.data;
            await validation(data);
            setLoading(false);
          }
        );
      })
      .catch((error) => {
        let responses = error.response.data;
        setFail(responses.fail);
        setResults(responses.result_set);
        setLoading(false);
      });
  };

  useEffect(() => {
    axios
      .post(
        `https://api.fonnte.com/device`,
        {},
        {
          headers: {
            Authorization: auth.fonnte_token,
          },
        }
      )
      .then((res) => {
        setDevice(res.data);
      });
  }, []);

  return (
    <>
      <NavBar />

      <Box p={4}>
        <Heading>Upload Data Pelamar</Heading>

        <Text mt={4}>
          Silahkan download template untuk mengupload file{" "}
          <Link to="/Template.xlsx" target="_blank" download>
            <Text as="b">Disini</Text>
          </Link>
        </Text>

        <br />

        {results.length == 0 && (
          <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(2, 1fr)">
            <GridItem>
              <FormControl>
                <FormLabel>Pilih File</FormLabel>
                <Input
                  type="file"
                  variant="unstyled"
                  name="file"
                  accept=".xlsx"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                onClick={() => upload(file)}
                isLoading={loading}
                disabled={device.device_status == "connect" ? false : true}
              >
                Submit
              </Button>
            </GridItem>
          </Grid>
        )}

        {results.length > 0 && (
          <Card>
            <CardBody>
              <Text as="b">Summary:</Text>
              <Text>Baris Terproses: {success}</Text>
              <Text>Jumlah Error: {fail}</Text>
              <Divider my={2} />
              <List spacing={3}>
                {results.map((result, i) => (
                  <ListItem key={i}>
                    {result[1] == "OK" ? (
                      <ListIcon as={MdCheckCircle} color="green.500" />
                    ) : (
                      <ListIcon as={MdCancel} color="red.500" />
                    )}
                    {result[0]} {result[1]}
                  </ListItem>
                ))}
              </List>
              <Divider my={2} />
              {fail > 0 && (
                <Text as="b">
                  Apabila terdapat salah satu baris saja yg error maka data
                  tidak dimasukkan ke database.
                </Text>
              )}
              {fail == 0 && <Text as="b">Berhasil import ke database.</Text>}
              <Divider my={2} />
              <Button colorScheme="teal" onClick={() => setResults([])}>
                Upload Ulang
              </Button>
            </CardBody>
          </Card>
        )}
      </Box>
    </>
  );
};

export default Upload;
