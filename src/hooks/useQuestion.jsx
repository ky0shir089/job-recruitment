import axios from "axios";
import { useSelector } from "react-redux";

const useQuestion = () => {
  const token = useSelector((state) => state.token.token);

  const getQuestion = async (page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/question?page=${page}`,
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

  const listQuestion = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/list-question`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const addQuestion = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/form/v1/store-question`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const showQuestion = async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/form/v1/show-question/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateQuestion = async (id, data) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/form/v1/update-question/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const deleteQuestion = async (id) => {
    let r = confirm("Apakah anda yakin akan menghapus data ini?");
    if (r) {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/form/v1/destroy-question/${id}`,
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
    getQuestion,
    listQuestion,
    addQuestion,
    showQuestion,
    updateQuestion,
    deleteQuestion,
  };
};

export default useQuestion;
