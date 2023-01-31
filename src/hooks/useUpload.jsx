import axios from "axios";
import { useSelector } from "react-redux";

const useUpload = () => {
  const token = useSelector((state) => state.token.token);

  const getUpload = async (id, page, search) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/data-upload?page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          search: search,
          user_id: id,
        },
      }
    );
    return response;
  };

  const addUpload = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/import`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  };

  const sendWhatsApp = async (token, target, message) => {
    const response = await axios.post(
      `https://api.fonnte.com/send`,
      {
        target: target,
        message: message,
        delay: 2,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  };

  const validateWhatsApp = async (token, target) => {
    const response = await axios.post(
      `https://api.fonnte.com/validate`,
      {
        target: target,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response;
  };

  const validation = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/validation`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateUpload = async (whatsapp, id) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/update-upload`,
      {
        whatsapp: whatsapp,
        message_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const getDataExpired = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/expired`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const updateResend = async (whatsapp, id, nik) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/pelamar/v1/update-resend`,
      {
        whatsapp: whatsapp,
        message_id: id,
        nik: nik,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  return {
    getUpload,
    addUpload,
    sendWhatsApp,
    validateWhatsApp,
    validation,
    updateUpload,
    getDataExpired,
    updateResend,
  };
};

export default useUpload;
