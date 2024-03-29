import axios from 'axios';
const BASE_URL = 'http://localhost:8080';

const http = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
})

export const getGames = async (offset) => {
    try {
        const res = await http.get('/games/getGames/')
        return res.data
    } catch (error) {
        throw new Error('Error fetching games:', error);
    }
}

export const getGame = async (game_id) => {
    try {
        const res = await http.get('/games/getGame/'+game_id)
        return res.data
    } catch (error) {
        throw new Error('Error fetching games:', error);
    }
}