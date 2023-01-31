import axios from "axios";
import { useSelector } from "react-redux";

const useJob = () => {
  const token = useSelector((state) => state.token.token);

  const getJob = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/job?page=${page}`,
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

  const listJob = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/list-job`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addJob = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/personalia/v1/store-job`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showJob = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/personalia/v1/show-job/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateJob = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/personalia/v1/update-job/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteJob = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/personalia/v1/destroy-job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    }
  };

  return { getJob, listJob, addJob, showJob, updateJob, deleteJob };
};

export default useJob;
