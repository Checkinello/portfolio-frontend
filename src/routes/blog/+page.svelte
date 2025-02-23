<script lang="ts">
	import { onMount } from 'svelte';
	import { apiBlogs, isLoading, error, loadBlogs, deleteBlog } from './store';
	import ButtonComponent from '$lib/ButtonComponent.svelte';
	import { writable } from 'svelte/store';
	import Navbar from '$lib/Navbar.svelte';

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
	// delete functie van store.ts gebruiken
	function handleClick(): void {
		if ($selectedBlog) {
			if (confirm("Are you sure you want to delete the blog?")) {
				deleteBlog($selectedBlog.id);
				console.log("Blog deleted");
			} else {
				console.log("Blog not deleted");
			}
		}
	}


</script>

<Navbar />

<body class="bg-neutral-800 text-neutral-200">
<div class="container flex flex-row  overflow-auto">
	<div class="flex flex-col container rounded-tr-lg p-12 bg-neutral-700 mb-0 w-2/5 mt-auto mr-56 h-[calc(100vh-4rem)]">
		<h2 class="text-2xl mb-4">Blog Posts</h2>

		{#if $isLoading}
			<p>Loading...</p>
		{/if}

		{#if $error}
			<p class="text-red-500">Error: {$error}</p>
		{/if}
		<!--alle blogs in de lijst aanroepen en klikken om ook de content te zien -->
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
<!--blog weergeven-->
	<div class="w-3/4 mt-24 font-poppins">
		{#if $selectedBlog}
			<h1 class="text-3xl font-bold mb-4 inline-flex">{$selectedBlog.title} <a href="blog/update?id={$selectedBlog.id}">
				<svg class="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24">
					<path d="M22.987,5.451c-.028-.177-.312-1.767-1.464-2.928-1.157-1.132-2.753-1.412-2.931-1.44-.237-.039-.479,.011-.682,.137-.118,.073-2.954,1.849-8.712,7.566C3.135,14.807,1.545,17.213,1.48,17.312c-.091,.14-.146,.301-.159,.467l-.319,4.071c-.022,.292,.083,.578,.29,.785,.188,.188,.443,.293,.708,.293,.025,0,.051,0,.077-.003l4.101-.316c.165-.013,.324-.066,.463-.155,.1-.064,2.523-1.643,8.585-7.662,5.759-5.718,7.548-8.535,7.622-8.652,.128-.205,.178-.45,.14-.689Zm-9.17,7.922c-4.93,4.895-7.394,6.78-8.064,7.263l-2.665,.206,.206-2.632c.492-.672,2.393-3.119,7.312-8.004,1.523-1.512,2.836-2.741,3.942-3.729,.01,.002,.02,.004,.031,.006,.012,.002,1.237,.214,2.021,.98,.772,.755,.989,1.93,.995,1.959,0,.004,.002,.007,.002,.011-.999,1.103-2.245,2.416-3.78,3.94Zm5.309-5.684c-.239-.534-.597-1.138-1.127-1.656-.524-.513-1.134-.861-1.674-1.093,1.139-.95,1.908-1.516,2.309-1.797,.419,.124,1.049,.377,1.481,.8,.453,.456,.695,1.081,.81,1.469-.285,.4-.851,1.159-1.798,2.278Z"/>
				</svg>
<!--verwijder knop-->
			</a></h1>
			<p class="mt-2 whitespace-normal break-words">{$selectedBlog.description}</p>
			<small class="text-neutral-500">
				Published on {new Date($selectedBlog.created_at).toLocaleDateString()}
				<ButtonComponent isGhost={false} text="Delete blog"  onClick={handleClick}
				/>

			</small>
		{:else}
			<p>Select a blog to view its content</p>
		{/if}
	</div>
</div>
</body>
