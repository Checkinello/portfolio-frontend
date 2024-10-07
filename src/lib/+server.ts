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
