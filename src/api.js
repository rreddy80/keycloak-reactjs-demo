import axios from 'axios';

const _axios = axios.create();

const createUser = () => {
    _axios.post('http://localhost:8888/auth/master/users', {
        email: 'ramesh.test1@gmail.com'
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}

export default createUser;