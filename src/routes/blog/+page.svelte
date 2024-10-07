<script lang="ts">
	import { onMount } from 'svelte';
	import { apiBlogs, isLoading, error, loadBlogs } from './store';
	import ButtonComponent from '$lib/ButtonComponent.svelte';
	import { writable } from 'svelte/store';

	interface BlogPost {
		id: number;
		title: string;
		description: string;
		created_at: string;
		updated_at: string;
	}

	let selectedBlog = writable<BlogPost | null>(null);

	onMount(async () => {
		await loadBlogs();
	});

	const selectBlog = (blog: BlogPost) => {
		selectedBlog.set(blog);
	};
</script>

<div class="bg-neutral-800 text-neutral-200 font-po">
	<nav class="navbar navbar-expand-lg navbar-dark bg-neutral-800">
		<ul class="flex flex-row justify-end h-16 text-xl items-center nav nav-tabs nav-stacked bg-neutral-800">
			<li class="mx-6"><a href="/">Home</a></li>
			<li class="mx-6"><a href="reviews">Reviews</a></li>
			<li class="mx-6"><a class="underline" href="blog">Blog</a></li>
			<li class="mx-6"><a href="about">About</a></li>
			<li class="mx-6"><a href="contact">Contact</a></li>
			<li class="mx-6">
				<a href="https://www.linkedin.com/in/yvo-zwijnenburg/">
					<img class="max-h-12" src="/img/linkedin.png" alt="linkedin logo" />
				</a>
			</li>
			<li class="mr-6">|</li>
			<li class="flex flex-row pr-2 gap-4">
				<ButtonComponent isGhost={true} url="/" text="Sign up" />
			</li>
			<li class="flex flex-row pr-2 gap-4">
				<ButtonComponent isGhost={false} url="/" text="Sign in" />
			</li>
		</ul>
	</nav>
</div>

<body class="bg-neutral-800 text-neutral-200">
<div class="container flex flex-row  overflow-auto">
	<div class="flex flex-col container  p-12 bg-neutral-700 mb-0 w-2/5 mt-auto mr-56 h-[calc(100vh-4rem)]">
		<h2 class="text-2xl mb-4">Blog Posts</h2>

		{#if $isLoading}
			<p>Loading...</p>
		{/if}

		{#if $error}
			<p class="text-red-500">Error: {$error}</p>
		{/if}

		<ul class="flex-grow overflow-y-scroll space-y-4 max-h-full">
			{#each $apiBlogs as blog}
				<li>
					<button
						on:click={() => selectBlog(blog)}
						class="text-left text-neutral-100 hover:text-neutral-400 focus:outline-none w-full">
						{blog.title}
					</button>
				</li>
			{/each}
		</ul>

		<div class="mt-auto pt-4">
			<ButtonComponent isGhost={true} url="/blog/create" text="Create blog" />
		</div>
	</div>

	<div class="w-3/4 mt-24 font-poppins">
		{#if $selectedBlog}
			<h1 class="text-3xl font-bold mb-4">{$selectedBlog.title}</h1>
			<p class="mt-2">{$selectedBlog.description}</p>
			<small class="text-neutral-500">
				Published on {new Date($selectedBlog.created_at).toLocaleDateString()}
			</small>
		{:else}
			<p>Select a blog to view its content</p>
		{/if}
	</div>
</div>
</body>
