<script lang="ts">
	import { loginUser } from '../store';
	import Navbar from '$lib/Navbar.svelte';

	let email = '';
	let password = '';

	const login = async () => {
		if (email && password) {
			await loginUser({ email, password });
		} else {
			console.error('Email and password are required');
		}
	};
</script>

<Navbar />

<div class="bg-neutral-800 text-neutral-200 font-po min-h-screen flex justify-center items-center">
	<div class="bg-neutral-700 p-8 rounded-lg shadow-md w-80">
		<h2 class="text-3xl text-neutral-200 mb-6 text-center">Sign in</h2>
		<form on:submit|preventDefault={login}>
			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-user text-neutral-400 mr-3"></i>
				<input
					bind:value={email}
					type="email"
					placeholder="Email"
					class="w-full bg-transparent outline-none text-neutral-200"
					required
				/>
			</div>

			<div class="flex items-center border-b border-neutral-500 py-2 mb-6">
				<i class="fas fa-lock text-neutral-400 mr-3"></i>
				<input
					bind:value={password}
					type="password"
					placeholder="Password"
					class="w-full bg-transparent outline-none text-neutral-200"
					required
				/>
			</div>

			<div class="text-right text-neutral-400 text-sm mb-6">
				<a href="/forgot-password" class="hover:underline">Forgot password?</a>
			</div>

			<button
				type="submit"
				class="w-full bg-neutral-600 text-neutral-200 py-2 px-4 rounded-lg hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-500">
				LOGIN
			</button>
		</form>

		<div class="text-center mt-4 text-neutral-400 text-sm">
			Don't have an account?
			<a href="/register" class="text-neutral-300 hover:underline">Sign up</a>
		</div>
	</div>
</div>
