import { writable, } from 'svelte/store';
import { GET } from '$lib/+server';
import { API_ENDPOINTS } from '$lib/api'

export const apiBlogs = writable<BlogPost[]>([]);
export const isLoading = writable<boolean>(false);
export const error = writable<string | null>(null);

export async function loadBlogs() {
	isLoading.set(true);
	error.set(null);

	try {
		const blogData = await GET<{ data: BlogPost[] }>(API_ENDPOINTS.blogs);
		apiBlogs.set(blogData.data);
	} catch (err) {
		const errorMessage = (err as Error).message || 'An error occurred while fetching blogs';
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

interface BlogPost {
	id: number;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
}
