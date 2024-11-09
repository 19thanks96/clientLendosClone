<script lang="ts">
    import {onMount} from "svelte";
    import {page} from "$app/stores";
    import {AdapterCommunicationService} from "$lib/adapter-listener";

    onMount(() => AdapterCommunicationService.sendMessage({ type: 'exit', message: $page.url.searchParams.get('message') ?? 'something went wrong'}))
</script>

<div class="w-full h-full justify-center text-center flex">
    <h1>BYYYEEEEEEEE</h1>
</div>
