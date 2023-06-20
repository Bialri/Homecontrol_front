import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_HOST

axios.interceptors.response.use( resp => resp, async error => {
    if (error.response.status === 401 || error.response.status === 422){
        let refresh_token = localStorage.getItem('refresh');
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + refresh_token
        const {status, data} = await axios.post('auth/refresh');

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.access}`
            localStorage.setItem('refresh',data.data.refresh);

            return axios(error.config);
        }
    }

    return error
});