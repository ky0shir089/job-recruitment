import axios from "axios";
import { useSelector } from "react-redux";

const useAssesmentSales = () => {
  const token = useSelector((state) => state.token.token);

  const getAssesmentSales = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/assesment-sales?page=${page}`,
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

  const addAssesmentSales = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/form/v1/store-assesment-sales`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showAssesmentSales = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/show-assesment-sales/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateAssesmentSales = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/form/v1/update-assesment-sales/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteAssesmentSales = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/form/v1/destroy-assesment-sales/${id}`,
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
    getAssesmentSales,
    addAssesmentSales,
    showAssesmentSales,
    updateAssesmentSales,
    deleteAssesmentSales,
  };
};

export default useAssesmentSales;
