import { getCookie } from '$lib/authStore';

// Deze pagia maakt de CRUD functies. de DELETE en PUT functie geven ook de cookies mee

export async function GET<T>(url: string, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(url, {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			...options,
		});

		return await response.json();
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
		throw error;
	}
}

export async function DELETE<T>(url: string, options: RequestInit = {}): Promise<T> {
	try {
		const token = getCookie('token');

		const headers = new Headers()
		headers.set('Content-Type', 'application/json')
		headers.set('Accept', 'application/json')
		headers.set('Authorization', `Bearer ${token}`)

		const response = await fetch(url, {
			method: 'DELETE',
			headers: headers,
			...options,
		});

		return await response.json();
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
		throw error;
	}
}

export async function POST<T>(url: string, data: unknown, options: RequestInit = {}): Promise<T> {

	console.log(data);

	try {
		const token = getCookie('token');

		const headers = new Headers()
		headers.set('Content-Type', 'application/json')
		headers.set('Accept', 'application/json')
		headers.set('Authorization', `Bearer ${token}`)

		const response = await fetch(url, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data),
			...options
		});

		if (!response.ok) {
			throw new Error(`Failed to post data to ${url}, status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error posting data to ${url}:`, error);
		throw error;
	}
}

export async function PUT<T>(url: string, data: unknown, options: RequestInit = {}): Promise<T> {
	try {

		const token = getCookie('token');

		const headers = new Headers()
		headers.set('Content-Type', 'application/json')
		headers.set('Accept', 'application/json')
		headers.set('Authorization', `Bearer ${token}`)


		const response = await fetch(url, {
			method: 'PUT',
			headers: headers,
			body: JSON.stringify(data),
			...options,
		});

		if (!response.ok) {
			throw new Error(`Failed to update data at ${url}, status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error(`Error updating data at ${url}:`, error);
		throw error;
	}
}