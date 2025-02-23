// dit is de hoofd link van de api
const BASE_URL = 'http://127.0.0.1:8000/api';

// Dit zijn links voor alle aparte routes in de api
export const API_ENDPOINTS = {
	blogs: `${BASE_URL}/blogs`,
	blog: `${BASE_URL}/blog`,
	reviews: `${BASE_URL}/reviews`,
	contactForms: `${BASE_URL}/contactForm`,
	user: `${BASE_URL}/user`,
	login: `${BASE_URL}/login`,
};