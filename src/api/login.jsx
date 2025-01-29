import axios from "axios";
// import { UserDetails } from "../types/components";
// https://studybot.zapto.org/get-evaluation/67936e82c471f51d5b407f26
// https://studybot.in/dashboard/performanceAnalytics?evaluationid=6790b18aed63871d78c5998d
export const apiCall = axios.create({
  baseURL: "https://studybot.zapto.org/",
  // baseURL: "https://studybot.in/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiCall.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});
