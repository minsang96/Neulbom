import axios from "axios";

const baseURL = __DEV__
  ? "http://k6a104.p.ssafy.io:3030/api"
  : "http://k6a104.p.ssafy.io:3030/api";

const client = axios.create({
  baseURL,
});

export default client;
