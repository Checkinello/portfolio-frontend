<!--Standaard button component met een Call to action en ghost variant.-->
<script lang="ts">
    export let url: string;
    export let text: string;
    export let isGhost: boolean;
    export let onClick: (() => void) | undefined;

    let ghost = 'bg-transparent text-neutral-200 border-neutral-200 border-2';
    let normal = 'bg-neutral-200 text-neutral-800';
</script>

<button
        class="p-2 font-bold rounded-2xl {isGhost ? ghost : normal}"
        on:click={() => onClick?.()}>
<a href="{url}">{text}</a>
</button>