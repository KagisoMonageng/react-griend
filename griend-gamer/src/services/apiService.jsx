import axios from 'axios';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const http = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const getUsers = async () => {
    try {
        const res = await http.get('/users')
        console.log(res)
        return res.data


    } catch (error) {
        throw new Error('Error fetching users:', error);
    }
}