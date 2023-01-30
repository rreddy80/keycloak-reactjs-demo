import axios from 'axios';
import UserService from "../services/UserService";

const _axios = axios.create();
const base_url = "http://localhost:8888";
const users_url = `${base_url}/admin/realms/mapps/users/`;
const users_group_id = "ecd3ffff-3cb6-4acc-bea8-5c30d4ad21b4";

export const createUser = async (newuser) => {
    await _axios.post(users_url, {
        email: newuser.email,
        username: newuser.email,
        firstName: newuser.firstname,
        emailVerified: false,
        enabled: true,
        groups: [],
        lastName: newuser.lastname,
        requiredActions: []
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}`
        }
    })
    .then((response) => {
        let userId = response.headers.location.replace(users_url, '');
        console.log(userId);
        assignGroup(userId);
        setPassword(userId);
        return userId;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(error);
    });
}

export const setPassword = async (userId) => {
    await _axios.put(`${users_url}${userId}/reset-password`, {
        type: "password",
        value: "password",
        temporary: false
    },
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}`
        }
    })
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(error);
    });
}

export const assignGroup = async (userId) => {
    await _axios.put(`${users_url}${userId}/groups/${users_group_id}`, 
    {},
    {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${UserService.getToken()}`
        }
    })
    .then((response) => {
        console.log(response);
        return response;
    })
    .catch((error) => {
        console.log(error);
        throw new Error(error);
    });
}
