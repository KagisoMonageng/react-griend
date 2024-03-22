import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

const http = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})



export const getGames = async () => {
    try {
        const res = await http.get('/games/getGames')
        console.log(res)
        return res.data


    } catch (error) {
        throw new Error('Error fetching users:', error);
    }
}