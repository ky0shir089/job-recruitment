import axios from "axios";
import { useSelector } from "react-redux";

const useDepartment = () => {
  const token = useSelector((state) => state.token.token);

  const getDepartment = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/department?page=${page}`,
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

  const listDepartment = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/list-department`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addDepartment = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/personalia/v1/store-department`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showDepartment = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/show-department/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateDepartment = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/personalia/v1/update-department/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteDepartment = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/personalia/v1/destroy-department/${id}`,
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
    getDepartment,
    listDepartment,
    addDepartment,
    showDepartment,
    updateDepartment,
    deleteDepartment,
  };
};

export default useDepartment;
