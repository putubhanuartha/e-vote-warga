import axios from "axios";
const mainServerUrl = process.env.NEXT_PUBLIC_MAIN_SERVER_URL as string
export const axiosWargaDefault = axios.create({ baseURL: mainServerUrl })
export const axiosWargaSecure = axios.create({ baseURL: mainServerUrl, withCredentials: true })