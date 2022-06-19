import axios from "axios";

const baseURL = __DEV__
  ? "https://neulbom_url/api"
  : "https://neulbom_url/api";

const client = axios.create({
  baseURL,
});

export default client;
