import axios from "axios";
import { useSelector } from "react-redux";

const useAccessOutlet = () => {
  const token = useSelector((state) => state.token.token);

  const getAccessOutlet = async (page, user_id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/access-outlet?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          user_id: user_id,
        },
      }
    );
    return response;
  };

  const addAccessOutlet = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/network/v1/store-access-outlet`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showAccessOutlet = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/show-access-outlet/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateAccessOutlet = async (id, status) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/network/v1/update-access-outlet/${id}`,
      {
        access_status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteAccessOutlet = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/network/v1/destroy-access-outlet/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return {
    getAccessOutlet,
    addAccessOutlet,
    showAccessOutlet,
    updateAccessOutlet,
    deleteAccessOutlet,
  };
};

export default useAccessOutlet;
