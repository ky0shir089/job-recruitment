import axios from "axios";
import { useSelector } from "react-redux";

const useEmployee = () => {
  const token = useSelector((state) => state.token.token);

  const getEmployee = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/employee?page=${page}`,
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

  const listEmployee = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/list-employee`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addEmployee = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/personalia/v1/store-employee`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showEmployee = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/show-employee/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateEmployee = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/personalia/v1/update-employee/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteEmployee = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/personalia/v1/destroy-employee/${id}`,
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
    getEmployee,
    listEmployee,
    addEmployee,
    showEmployee,
    updateEmployee,
    deleteEmployee,
  };
};

export default useEmployee;
