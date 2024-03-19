import axios from 'axios';


const base = 'http://localhost:8997';


export const filterServices = (payload) => {
      return axios.post(`${base}/api/v1/serviceProfiles/search`, payload)
}