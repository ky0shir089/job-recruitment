import axios from "axios";
import { useSelector } from "react-redux";

const useOutlet = () => {
  const token = useSelector((state) => state.token.token);

  const getOutlet = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/outlet?page=${page}`,
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

  const listOutlet = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/list-outlet?page=${page}`,
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

  const addOutlet = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/network/v1/store-outlet`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showOutlet = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/show-outlet/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateOutlet = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/network/v1/update-outlet/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteOutlet = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/network/v1/destroy-outlet/${id}`,
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
    getOutlet,
    listOutlet,
    addOutlet,
    showOutlet,
    updateOutlet,
    deleteOutlet,
  };
};

export default useOutlet;
