import { Box, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Home = () => {
  const auth = useSelector((state) => state.user.user);

  return (
    <Box p={4}>
      <Heading>Selamat datang, {auth.name}</Heading>
    </Box>
  );
};

export default Home;
