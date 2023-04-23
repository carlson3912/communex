import axios from 'axios';

export default axios.create({
    baseURL: 'https://srsbackend.herokuapp.com'
});