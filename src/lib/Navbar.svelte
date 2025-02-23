<!--Navbar component-->
<script lang="ts">
	import ButtonComponent from '$lib/ButtonComponent.svelte';
	import { logoutUser } from '../routes/User/store';
	import { isLoggedIn, checkAuthentication } from '$lib/authStore';
	import { onMount } from 'svelte';
	const handleLogout = () => {
		logoutUser();
		checkAuthentication();
	};

	onMount(() => {
		checkAuthentication();
	});
</script>

<div class="bg-neutral-800 text-neutral-200 font-po">
	<nav class="navbar navbar-expand-lg navbar-dark bg-neutral-800">
		<ul class="flex flex-row justify-end h-16 text-xl items-center nav nav-tabs nav-stacked bg-neutral-800">
			<li class="mx-6"><a href="/">Home</a></li>
			<li class="mx-6"><a href="/reviews">Reviews</a></li>
			<li class="mx-6"><a href="/blog">Blog</a></li>
			<li class="mx-6"><a href="/about">About</a></li>
			<li class="mx-6"><a href="/contact">Contact</a></li>
			<li class="mx-6">
				<a href="https://www.linkedin.com/in/yvo-zwijnenburg/">
					<img class="max-h-12" src="/img/linkedin.png" alt="linkedin logo" />
				</a>
			</li>
			<li class="mr-6">|</li>

			{#if $isLoggedIn}
				<li class="flex flex-row pr-2 gap-4">
					<button on:click={handleLogout} class="bg-neutral-200 text-neutral-800 p-2 font-bold rounded-2xl">Log Out</button>
				</li>
			{:else}
				<li class="flex flex-row pr-2 gap-4">
					<ButtonComponent isGhost={true} url="/User/Register" text="Sign up" />
				</li>
				<li class="flex flex-row pr-2 gap-4">
					<ButtonComponent isGhost={false} url="/User/Login" text="Sign in" />
				</li>
			{/if}
		</ul>
	</nav>
</div>
