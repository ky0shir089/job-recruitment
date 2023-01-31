import axios from "axios";

export const siteVerify = async (token) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/siteverify`,
    { token: token }
  );
  return response;
};

export const signIn = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/login`,
    data
  );
  return response;
};

export const changePassword = async (token, data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/v1/change-password`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const navDrawer = async (token, id) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/setup-aplikasi/v1/navigation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user_id: id,
      },
    }
  );
  return response;
};
