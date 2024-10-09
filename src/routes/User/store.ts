import { POST } from '$lib/+server';
import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { API_ENDPOINTS } from '$lib/api';
import { goto } from '$app/navigation';

export const user = writable<User | null>(null);
export const authToken = writable<string | null>(browser ? getCookie('token') : null);
export const isLoading = writable<boolean>(false);
export const error = writable<string | null>(null);
export let loggedIn = false;

interface User {
	id: number;
	name: string;
	email: string;
	created_at: string;
	updated_at: string;
}

interface UserCredentials {
	email: string;
	password: string;
}

interface RegisterUserData {
	name: string;
	email: string;
	password: string;
	password_confirmation: string;
}


function setCookie(name: string, value: string, days: number) {
	const expires = new Date(Date.now() + days * 864e5).toUTCString();
	document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

export async function checkCookie(){
	loggedIn = await getCookie('token') != null;
}

function deleteCookie(name: string) {
	document.cookie = name + '=; Max-Age=-99999999;';
}

export async function registerUser(newUser: RegisterUserData) {
	isLoading.set(true);
	error.set(null);

	try {
		const createdUser = await POST<User>(API_ENDPOINTS.user, newUser);

		user.set(createdUser);
		goto('/User/Login')
	} catch (err) {
		const errorMessage = (err as Error).message || 'An error occurred while registering the user';
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

export async function loginUser(credentials: UserCredentials) {
	isLoading.set(true);
	error.set(null);

	try {
		const loggedInUser = await POST<{ user: User; token: string }>(API_ENDPOINTS.login, credentials);

		user.set(loggedInUser.user);

		setCookie('token', loggedInUser.token, 7);

		authToken.set(loggedInUser.token);

		loggedIn = true;


		console.log('Login successful:', loggedInUser.token);

		goto('/');
	} catch (err) {
		const errorMessage = (err as Error).message || 'An error occurred while logging in';
		error.set(errorMessage);
		console.error('Error during login:', errorMessage);
	} finally {
		isLoading.set(false);
	}
}

export function logoutUser() {
	user.set(null);

	authToken.set(null);
	deleteCookie('token');
	loggedIn = false;
	console.log('User logged out');
}

