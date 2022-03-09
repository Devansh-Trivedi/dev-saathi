import axios from "./axiosConfig";
import config from "../config";

export const formDataSubmit = async (data) =>
  await axios.post(`${config.SERVER_API_URL}/projectrequest`, {
    ...data,
  });
