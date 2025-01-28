import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://tech-hive-server-mu.vercel.app",
});
const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  // request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("requested stopped by interceptors::::::::::::>", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      //do sth with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor : 401 and 403 status
  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      // console.log("status error in the interceptor", error);
      // for 401 & 403 signOut the user and move the user to the login page
      if (status === 401 || status === 403) {
        await signOutUser();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
