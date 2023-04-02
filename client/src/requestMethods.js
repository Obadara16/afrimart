import axios from "axios";

export const BASE_URL = "https://afrimart-backend.onrender.com/api/";
export const TEST_URL = 'http://localhost:5000/api/'
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.token
console.log(TOKEN)

export const publicRequest = axios.create({
  baseURL: TEST_URL,
});

export const userRequest = axios.create({
  baseURL: TEST_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

