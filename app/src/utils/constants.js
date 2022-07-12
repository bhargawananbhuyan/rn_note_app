import axios from 'axios'

export const colors = {
	primary: '#22C55E',
	primaryBg: '#3c3c3c',
}

export const authService = axios.create({
	baseURL: 'http://192.168.43.18:5000/api/auth',
})
