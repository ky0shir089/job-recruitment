import axios from "axios";
import { useSelector } from "react-redux";

const useAuth = () => {
  const token = useSelector((state) => state.token.token);

  const showUser = async (search) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/v1/user`,
      {
        search: search,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  };

  return { showUser };
};

export default useAuth;
