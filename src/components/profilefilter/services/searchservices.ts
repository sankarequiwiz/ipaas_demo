import axios from 'axios';


const base = 'http://localhost:8997';

declare global {
     interface Window {
          authUserId: string
     }
}

const withHeaders = (authuserid: string | undefined = undefined, sc: 'PORTAL' | 'API' | undefined = undefined) => {
     return { authuserid: authuserid || 'c409ba07-419d-4b15-982e-40c085db0927', sourcechannel: sc || 'PORTAL' }
}


export const serviceProfiles = (payload: any) => {
     return axios.post(`${base}/api/v1/serviceProfiles/search`, payload, { headers: withHeaders() })
}

export const serviceProfilesById = (id: string) => {
     return axios.get(`${base}/api/v1/serviceProfiles/${id}`, { headers: withHeaders() })
}

export const createIntegration = (payload: any) => {
     return axios.post(`http://192.168.29.111:8995/api/v1/integrations`, payload, { headers: withHeaders('c409ba07-419d-4b15-982e-40c085db0927', 'API') })
}