<script>
import ButtonComponent from '$lib/ButtonComponent.svelte';
</script>

<div class="bg-neutral-800 text-neutral-200 font-po">
    <nav class="navbar navbar-expand-lg navbar-dark bg-neutral-800">
        <ul class="flex flex-row justify-end h-16 text-xl items-center nav nav-tabs nav-stacked :bg neutral-800">
            <li class="mx-6"><a class="underline" href="/">Home</a></li>
            <li class="mx-6"><a href="reviews">Reviews</a></li>
            <li class="mx-6"><a href="blog">Blog</a></li>
            <li class="mx-6"><a href="about">About</a></li>
            <li class="mx-6"><a href="contact">Contact</a></li>
            <li>|</li>
            <li class="mx-6"><a href="https://www.linkedin.com/in/yvo-zwijnenburg/"><img class="max-h-12" src="/img/linkedin.png" alt="linkedin logo"></a></li>
            <div class="flex flex-row gap-4">
            <li><ButtonComponent isGhost={true} url="/" text="Sign up"/></li>
            <li><ButtonComponent isGhost={false} url="/" text="Sign in"/></li>
            </div>
        </ul>
    </nav>
</div>
<body class="bg-neutral-800 text-neutral-200">
<div class="flex items-center justify-center min-h-screen p-4">
    <div class="flex flex-col md:flex-row items-center max-w-6xl p-6 rounded-lg">
        <!-- Text Container -->
        <div class="flex-1 text-center md:text-left mb-6 md:mb-0">
            <h1 class="font-poppins text-7xl font-bold mb-4">Yvo Zwijnenburg</h1>
            <h2 class="font-poppins text-5xl text-neutral-400 font-bold mb-4">Software Developer</h2>
            <p class="text-xl max-w-3xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nisl erat, scelerisque nec felis sit amet, ornare vestibulum massa. Praesent non lacinia sem. Nulla luctus euismod faucibus. Ut convallis libero sed interdum venenatis. Quisque accumsan odio a massa sagittis pretium. Fusce ultricies, ipsum vel congue posuere, libero lacus vulputate urna, eget varius enim orci placerat urna. Pellentesque leo mauris, malesuada non mi ac, convallis tincidunt tellus. Vivamus vulputate nisl aliquam neque dapibus, at tristique nisl efficitur. Duis ornare dictum lorem, et tristique nulla maximus eu. Fusce dignissim ut justo vel venenatis.
            </p>
            <div class="flex flex-col md:flex-row gap-4">
                <ButtonComponent isGhost={true} url="about" text="View my projects"/>
                <ButtonComponent isGhost={false} url="contact" text="Contact me"/>
            </div>
        </div>
        <!-- Image Container -->
        <div class="flex-1 flex justify-center md:justify-end">
            <img class="rounded-full border-4 border-neutral-200" src="/img/roy.png" alt="roy">
        </div>
    </div>
</div>
</body>