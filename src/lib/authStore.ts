// Hier pakt het de token en stopt het in een cookie om op andere plekken te gebruiken als verificatie.
import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);

export const checkAuthentication = () => {
	const token = getCookie('token');
	isLoggedIn.set(!!token);
	console.log(!!token);
};

export const getCookie = (name: string) => {
	const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return match ? match[2] : null;
};
