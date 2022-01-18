import axios from "axios";
import {BASE_URL} from "../config";

export const payment = email => {
    return axios.post(`${BASE_URL}pay`,{email});
}