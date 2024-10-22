import Axios from 'axios';

const axiosBaseURL = Axios.create({
    baseURL:'http://localhost:8000/api/v1'
});

export default axiosBaseURL