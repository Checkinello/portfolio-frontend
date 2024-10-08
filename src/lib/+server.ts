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

export async function POST<T>(url: string, data: unknown, options: RequestInit = {}): Promise<T> {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
			body: JSON.stringify(data),
			...options,
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