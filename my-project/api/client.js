import axios from "axios";

const baseURL = __DEV__
  ? "https://k6a104.p.ssafy.io/api"
  : "https://k6a104.p.ssafy.io/api";

const client = axios.create({
  baseURL,
});

export default client;
