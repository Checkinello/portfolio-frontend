<script lang="ts">
	import { createBlog, isLoading, error } from '../store';
	import Navbar from '$lib/Navbar.svelte';

	let newBlogTitle = '';
	let newBlogDescription = '';

	const handleCreateBlog = async () => {
		if (newBlogTitle && newBlogDescription) {
			await createBlog({
				'title': newBlogTitle,
				'description': newBlogDescription,
			});
		}
	};
</script>

<Navbar />

<div class="bg-neutral-800 text-neutral-200 font-po min-h-screen flex justify-center items-center">
	<div class="bg-neutral-700 p-8 rounded-lg shadow-md w-full max-w-lg">
		<h2 class="text-3xl text-neutral-200 mb-6 text-center">Create New Blog Post</h2>

		{#if $isLoading}
			<p class="text-center text-neutral-400">Loading blogs...</p>
		{/if}

		{#if $error}
			<p class="text-center text-red-500 mb-4">{$error}</p>
		{/if}

		<form on:submit|preventDefault={handleCreateBlog}>
			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-heading text-neutral-400 mr-3"></i>
				<input
					type="text"
					bind:value={newBlogTitle}
					placeholder="Blog Title"
					class="w-full bg-transparent outline-none text-neutral-200 text-lg"
					required
				/>
			</div>

			<div class="border-b border-neutral-500 py-2 mb-6">
                <textarea
									bind:value={newBlogDescription}
									placeholder="Blog Description"
									class="w-full bg-transparent outline-none text-neutral-200 resize-none h-48 text-base"
									required
								></textarea>
			</div>

			<button
				type="submit"
				class="w-full bg-neutral-600 text-neutral-200 py-3 px-4 rounded-lg hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500 text-lg">
				Create Blog
			</button>
		</form>
	</div>
</div>
