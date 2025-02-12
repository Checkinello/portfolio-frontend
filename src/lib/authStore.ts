// src/lib/authStore.ts
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
