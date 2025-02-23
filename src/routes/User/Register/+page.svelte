<script lang="ts">
	import { registerUser, isLoading, error } from '../store';
	import Navbar from '$lib/Navbar.svelte';

	let name = '';
	let email = '';
	let password = '';
	let password_confirmation = '';

	// ingevulde data invoeren en funtie in store.ts aanroepen
	const submitRegistration = async () => {
		await registerUser({ name, email, password, password_confirmation });
	};
</script>

<Navbar />

<div class="bg-neutral-800 text-neutral-200 font-po min-h-screen flex justify-center items-center">
	<div class="bg-neutral-700 p-8 rounded-lg shadow-md w-80">
		<h2 class="text-3xl text-neutral-200 mb-6 text-center">Sign up</h2>
		<form on:submit|preventDefault={submitRegistration}>
			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-user text-neutral-400 mr-3"></i>
				<input
					type="text"
					bind:value={name}
					placeholder="Username"
					class="w-full bg-transparent outline-none text-neutral-200"
				/>
			</div>

			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-envelope text-neutral-400 mr-3"></i>
				<input
					type="email"
					bind:value={email}
					placeholder="Email"
					class="w-full bg-transparent outline-none text-neutral-200"
				/>
			</div>

			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-lock text-neutral-400 mr-3"></i>
				<input
					type="password"
					bind:value={password}
					placeholder="Password"
					class="w-full bg-transparent outline-none text-neutral-200"
				/>
			</div>

			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-lock text-neutral-400 mr-3"></i>
				<input
					type="password"
					bind:value={password_confirmation}
					placeholder="Confirm Password"
					class="w-full bg-transparent outline-none text-neutral-200"
				/>
			</div>

			<button
				type="submit"
				disabled={$isLoading}
				class="w-full bg-neutral-600 text-neutral-200 py-2 px-4 rounded-lg hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500">
				SIGN UP
			</button>

			{#if $isLoading}
				<p>Loading...</p>
			{/if}

			{#if $error}
				<p class="text-red-500">Error: {$error}</p>
			{/if}
		</form>

		<div class="text-center mt-4 text-neutral-400 text-sm">
			Already have an account?
			<a href="/login" class="text-neutral-300 hover:underline">Sign in</a>
		</div>
	</div>
</div>

<style>
    button:focus {
        outline: none;
        box-shadow: none;
    }
</style>