import axios from 'axios'

axios.defaults.baseURL = process.env.apiURL

export default axios