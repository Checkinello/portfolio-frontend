import { writable } from 'svelte/store';
import { GET, POST, PUT, DELETE } from '$lib/+server';
import { API_ENDPOINTS } from '$lib/api';
import { getCookie } from '$lib/authStore';
import { goto } from '$app/navigation';


interface BlogPost {
	id: number;
	title: string;
	description: string;
	created_at: string;
	updated_at: string;
}

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

export async function deleteBlog(id: number) {
	isLoading.set(true);
	error.set(null);

	const token = getCookie('token');

	if (!token) {
		error.set('You must be logged in to delete a blog post.');
		isLoading.set(false);
		return;
	}

	try {
		await DELETE<BlogPost>(`${API_ENDPOINTS.blog}/${id}`, {});

		apiBlogs.update((currentBlogs) => currentBlogs.filter((blog) => blog.id !== id));
	} catch (err) {
		const errorMessage = (err as Error).message || 'An error occurred while deleting the blog post';
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}

	export async function createBlog(newBlog: Partial<BlogPost>) {
		isLoading.set(true);
		error.set(null);

		const token = getCookie('token');

		if (!token) {
			error.set('You must be logged in to create a blog post.');
			isLoading.set(false);
			return;
		}


		try {
			const response = await POST<BlogPost>(API_ENDPOINTS.blog, newBlog, {});

			apiBlogs.update((currentBlogs) => [response, ...currentBlogs]);
			goto('/blog');

			return response;
		} catch (err) {
			const errorMessage = (err as Error).message || 'An error occurred while creating the blog post';
			error.set(errorMessage);
		} finally {
			isLoading.set(false);
		}
	}
export async function updateBlog(id: number, updatedBlog: Partial<BlogPost>) {
	isLoading.set(true);
	error.set(null);
	console.log(id)

	const token = getCookie('token');

	if (!token) {
		error.set('You must be logged in to update a blog post.');
		isLoading.set(false);
		return;
	}

	try {
		const response = await PUT<BlogPost>(`${API_ENDPOINTS.blog}/${id}`, updatedBlog, {
		});

		apiBlogs.update((currentBlogs) => {
			return currentBlogs.map((blog) => (blog.id === id ? response : blog));
		});
		goto('/blog');
		return response;
	} catch (err) {
		const errorMessage = (err as Error).message || 'An error occurred while updating the blog post.';
		error.set(errorMessage);
	} finally {
		isLoading.set(false);
	}
}
