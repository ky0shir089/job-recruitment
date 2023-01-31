import axios from "axios";
import { useSelector } from "react-redux";

const useFiveC = () => {
  const token = useSelector((state) => state.token.token);

  const getFiveC = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/five-c?page=${page}`,
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

  const addFiveC = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/form/v1/store-five-c`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showFiveC = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/show-five-c/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateFiveC = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/form/v1/update-five-c/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteFiveC = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/form/v1/destroy-five-c/${id}`,
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
    getFiveC,
    addFiveC,
    showFiveC,
    updateFiveC,
    deleteFiveC,
  };
};

export default useFiveC;
