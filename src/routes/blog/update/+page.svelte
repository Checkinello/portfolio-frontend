<script lang="ts">
	import { updateBlog, loadBlogs, apiBlogs, isLoading, error } from '../store';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { get } from 'svelte/store';
	import Navbar from '$lib/Navbar.svelte';

	interface BlogPost {
		id: number;
		title: string;
		description: string;
		created_at: string;
		updated_at: string;
	}

	let blogId: number | null = null;
	let updatedBlogTitle = '';
	let updatedBlogDescription = '';
	let blog: BlogPost | null = null;
	// Id pakken zodat je de correcte blog aanpast
	$: {
		const queryParams = new URLSearchParams($page.url.search);
		const id = queryParams.get('id');
		blogId = id ? parseInt(id) : null;
	}
	// content can blog laden om aan te passen
	onMount(async () => {
		await loadBlogs();
		const blogs = get(apiBlogs);
		if (blogId) {
			blog = blogs.find((b: BlogPost) => b.id === blogId) || null;
			if (blog) {
				updatedBlogTitle = blog.title;
				updatedBlogDescription = blog.description;
			}
		}
	});
	// correcte waarden meegeven om naar de UPDATE functie te sturen en de store.ts
	const handleUpdateBlog = async () => {
		if (blogId && updatedBlogTitle && updatedBlogDescription) {
			await updateBlog(blogId, {
				title: updatedBlogTitle,
				description: updatedBlogDescription,
			});
		} else {
			alert('Please fill in all fields.');
		}
	};
</script>

<Navbar />

<div class="bg-neutral-800 text-neutral-200 font-po min-h-screen flex justify-center items-center">
	<div class="bg-neutral-700 p-8 rounded-lg shadow-md w-full max-w-lg">
		<h2 class="text-3xl text-neutral-200 mb-6 text-center">Update New Blog Post</h2>

		{#if $isLoading}
			<p class="text-center text-neutral-400">Loading blogs...</p>
		{/if}

		{#if $error}
			<p class="text-center text-red-500 mb-4">{$error}</p>
		{/if}

		<form on:submit|preventDefault={handleUpdateBlog}>
			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-heading text-neutral-400 mr-3"></i>
				<input
					type="text"
					bind:value={updatedBlogTitle}
					placeholder="Blog Title"
					class="w-full bg-transparent outline-none text-neutral-200 text-lg"
					required
				/>
			</div>	

			<div class="border-b border-neutral-500 py-2 mb-6">
                <textarea
									bind:value={updatedBlogDescription}
									placeholder="Blog Description"
									class="w-full bg-transparent outline-none text-neutral-200 resize-none h-48 text-base"
									required
								></textarea>
			</div>

			<button
				type="submit"
				class="w-full bg-neutral-600 text-neutral-200 py-3 px-4 rounded-lg hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-lg">
				Update Blog
			</button>
		</form>
	</div>
</div>
