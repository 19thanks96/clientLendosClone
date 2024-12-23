<script lang="ts">
    import {showPopUpLayout} from '$lib/state/popup.state';
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import InfoButton from '$lib/components/common/InfoButton.svelte';

    export let title: string = '';
    export let text: string;
    export let description: string = "";
    export let withInfoButton : boolean = true;

    function openPopup() {
        console.log(description)
        if (description) {
            $showPopUpLayout.isOpen = true;
            $showPopUpLayout.name = title;
            $showPopUpLayout.description = description;
            AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
        }
    }
</script>


<div
  class="relative top-[45%] left-[0%] title text-[#D2D2D2] text-[10px] leading-[1.5] flex items-center justify-center pl-[5px]">
    {text}
    {#if withInfoButton}
    <button on:click={openPopup} style="aspect-ratio: 1/1" class="absolute top-0 right-[5%] sm:right-[2%] h-full flex items-center  justify-center  z-[6] scale-50">
        <InfoButton rounded={16}/>
    </button>
    {/if}
</div>


<style lang="scss">
    .title {
        z-index: 2;
        width: 100%;
        height: 46px;
        background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 38.5%, rgba(0, 0, 0, 0.9) 61%, rgba(0, 0, 0, 0) 100%);
        font-family: 'Poppins';
        font-style: italic;
        font-weight: 700;
        font-size: 30px;
        line-height: 30px;
        /* identical to box height, or 100% */
        text-align: center;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        color: #E9E9E9;
    }
</style>