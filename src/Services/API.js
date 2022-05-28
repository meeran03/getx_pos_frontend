import axios from 'axios';
import {baseURL} from './Constants.js'

const instance = axios.create({
    baseURL: `http://${baseURL}/api/`,
    headers: {
        "Content-Type":"application/json",
        "Accept" : "application/json"
    }
  });

export default instance;