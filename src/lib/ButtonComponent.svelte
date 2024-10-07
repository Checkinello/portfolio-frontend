<script lang="ts">

	export let url : string;
	export let text : string;
	export let isGhost : boolean;

	let ghost = 'bg-transparent text-neutral-200 border-neutral-200 border-2';
	let normal = 'bg-neutral-200 text-neutral-800';
	// let buttonProps = {
	// 	class:[$$restProps.class]
	// }
</script>
<button class=" p-2 font-bold rounded-2xl {isGhost ? ghost : normal}"><a href="{url}">{text}</a></button>