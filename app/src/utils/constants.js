import axios from 'axios'

export const colors = {
	primary: '#22C55E',
	primaryBg: '#3c3c3c',
}

export const authService = axios.create({
	baseURL: 'http://192.168.43.231:5000/api/auth',
})

export const noteService = axios.create({
	baseURL: 'http://192.168.43.231:5000/api/notes'
})

export const options = ["Self development", "Learning"];
