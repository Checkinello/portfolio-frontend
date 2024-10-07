<script>
import ButtonComponent from '$lib/ButtonComponent.svelte';
</script>

<div class="bg-neutral-800 text-neutral-200">
    <nav class="navbar navbar-expand-lg navbar-dark bg-neutral-800">
        <ul class="flex flex-row justify-end h-16 text-xl items-center nav nav-tabs nav-stacked :bg neutral-800">
            <li class="mx-6"><a href="/">Home</a></li>
            <li class="mx-6"><a href="reviews">Reviews</a></li>
            <li class="mx-6"><a href="blog">Blog</a></li>
            <li class="mx-6"><a href="about">About</a></li>
            <li class="mx-6"><a class="underline" href="contact">Contact</a></li>
            <li class="mx-6"><a href="https://www.linkedin.com/in/yvo-zwijnenburg/"><img class="max-h-12" src="/img/linkedin.png" alt="linkedin logo"></a></li>
            <li class="mr-6">|</li>
            <div class="flex flex-row pr-2 gap-4">
                <li><ButtonComponent isGhost={true} url="/" text="Sign up"/></li>
                <li><ButtonComponent isGhost={false} url="/" text="Sign in"/></li>
            </div>
        </ul>
    </nav>
</div>
<h1>CONTACT</h1>