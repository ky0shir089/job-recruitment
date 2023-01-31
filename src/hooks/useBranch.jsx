import axios from "axios";
import { useSelector } from "react-redux";

const useBranch = () => {
  const token = useSelector((state) => state.token.token);

  const getBranch = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/branch?page=${page}`,
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

  const listBranch = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/list-branch`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addBranch = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/network/v1/store-branch`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showBranch = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/network/v1/show-branch/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateBranch = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/network/v1/update-branch/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteBranch = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/network/v1/destroy-branch/${id}`,
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
    getBranch,
    listBranch,
    addBranch,
    showBranch,
    updateBranch,
    deleteBranch,
  };
};

export default useBranch;
