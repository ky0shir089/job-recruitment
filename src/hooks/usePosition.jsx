import axios from "axios";
import { useSelector } from "react-redux";

const usePosition = () => {
  const token = useSelector((state) => state.token.token);

  const getPosition = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/position?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: search,
        },
      }
    );
    return response;
  };

  const listPosition = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/list-position`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addPosition = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/personalia/v1/store-position`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showPosition = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/show-position/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updatePosition = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/personalia/v1/update-position/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deletePosition = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/personalia/v1/destroy-position/${id}`,
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
    getPosition,
    listPosition,
    addPosition,
    showPosition,
    updatePosition,
    deletePosition,
  };
};

export default usePosition;
