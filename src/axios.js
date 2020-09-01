import axios from 'axios';
import { urlDev, urlProd } from './env.js';

const http = axios.create({
	baseURL: process.env.NODE_ENV !== 'production' ? urlDev : urlProd,
	headers: {
		Authorization: ''
	},
	responseType: 'json',
	retry: 3,
	retryDelay: 1000
});
	
http.interceptors.request.use(
	config => {
		const user_token = localStorage.getItem('token');
		if (user_token) {
			config.headers.Authorization = `Bearer ${user_token}`;
		} 
		return config;
	},
	error => Promise.reject(error)
);

export default http;
