import axios from "axios";

const server = axios.create({
  baseURL: process.env.REACT_APP_LOCALHOST_RESTFUL,
});

export { server };
