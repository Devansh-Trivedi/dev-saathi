import config from '../../config'
const axios = require("axios");

export const registerUserApi = async ({
  name,
  phoneNumber,
  email,
  password,
  userName
}) =>
  await axios.post(`${config.SERVER_API_URL}/signup`, {
    name,
    phoneNumber,
    email,
    password,
    userName
  });

export const loginUserApi = async ({ email, password }) =>
  await axios.post(`${config.SERVER_API_URL}/login`, {
    email,
    password,
  });
