// import axios from "axios";
// import jwt_decode from "jwt-decode";
// import dayjs from "dayjs";
// import { useNavigate } from "react-router-dom";

// // Handle Before Execute

// // let refreshRequest = false;

// // axios.interceptors.request.use(
// //     async (config) => {
// //         // console.log("check test");
// //         const navigate = useNavigate();

// //         const token = localStorage.getItem("token");
// //         if (token && !refreshRequest) {

// //             const user = jwt_decode(token);
// //             const isTokenExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

// //             if (isTokenExpired) {
// //                 refreshRequest = true
// //                 const response = await axios.post(
// //                     process.env.REACT_APP_API_BACKEND + "users/refresh-token",
// //                     { refreshToken: (localStorage.getItem("refreshToken")) }
// //                     ,
// //                     {
// //                         headers: { "Content-Type": "application/json" },
// //                     },
// //                     { withCredentials: true }
// //                 );
// //                 console.log(response.data)

// //                 window.location.reload(false)
// //                 navigate('../sign-in')

// //                 localStorage.setItem("token", response.data.data.token);
// //                 localStorage.setItem("refreshToken", response.data.data.refreshToken);

// //                 axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.token}`;
// //             }

// //         }

// //         return config;
// //     },
// //     async (error) => {
// //         // Do something with request error

// //         return Promise.reject(error);
// //     }
// // );




// Error Handling response example

// let refreshResponse = false

// axios.interceptors.response.use(
//     (resp) => resp,
//     async (error) => {
//         let navigate = useNavigate();
//         console.log(error.response.status)
//         if (!refreshResponse) {
//             if (error.response.status === 400) {
//                 if (error.response.data.message === "Token Auth Expired" && !refreshResponse) {
//                     localStorage.removeItem("id");
//                     localStorage.removeItem("role");
//                     localStorage.removeItem("token");
//                     localStorage.removeItem("refreshToken");

//                 } else if (error.response.data.message === "Token Auth Invalid" && !refreshResponse) {
//                     localStorage.removeItem("id");
//                     localStorage.removeItem("role");
//                     localStorage.removeItem("token");
//                     localStorage.removeItem("refreshToken");
//                 } else if (error.response.data.message === "Token Auth Not Active" && !refreshResponse) {
//                     localStorage.removeItem("id");
//                     localStorage.removeItem("role");
//                     localStorage.removeItem("token");
//                     localStorage.removeItem("refreshToken");
//                 }
//             }
//         }
//         refreshResponse = false
//         return error;
//     }
// );





















// import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
// import useRefreshToken from "./useRefreshToken";
// import useAuth from "./useAuth";

// const useAxiosPrivate = () => {

//     useEffect(() => {

//         const requestIntercept = axiosPrivate.interceptors.request.use(
//             config => {
//                 if (!config.headers['Authorization']) {
//                     config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
//                 }
//                 return config;
//             }, (error) => Promise.reject(error)
//         );

//         const responseIntercept = axiosPrivate.interceptors.response.use(
//             response => response,
//             async (error) => {
//                 const prevRequest = error?.config;
//                 if (error?.response?.status === 403 && !prevRequest?.sent) {
//                     prevRequest.sent = true;
//                     const newAccessToken = await refresh();
//                     prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                     return axiosPrivate(prevRequest);
//                 }
//                 return Promise.reject(error);
//             }
//         );

//         return () => {
//             axiosPrivate.interceptors.request.eject(requestIntercept);
//             axiosPrivate.interceptors.response.eject(responseIntercept);
//         }
//     }, [])

//     return axiosPrivate;
// }

// export default useAxiosPrivate;