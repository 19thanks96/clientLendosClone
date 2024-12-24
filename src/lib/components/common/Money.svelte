<script lang="ts">
    import {goto} from '$app/navigation';
    import {playerState} from '$lib/state/player.state';
    import {page} from "$app/stores";
		import coin from "$lib/components/common/Coin.svelte?raw";
		import { AdapterCommunicationService } from '$lib/adapter-listener';

    export let balance: number;
    let isFormWidget = $page.url.searchParams.get('fromWidget')
    export let isNotReward = true;



    $: frontMoney = Math.round(balance)?.toLocaleString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ') ?? '';

    //#tutorial
    $:isClickable = $playerState.store && (!$playerState.tutorial || $playerState.tutorial && $playerState.tutorial.step === 4)


    const onClickBalance = async () => {
        if (isClickable && !isFormWidget && isNotReward) {
					AdapterCommunicationService.sendMessage({
						type: 'redirect',
						message: '/store'
					})
            await goto('/store')
        }
    }
</script>


<div on:click={onClickBalance} class="absolute h-[26px] rounded-[14px] bg-black top-[35px] left-[13px] p-[4px_8px_4px_4px] flex flex-row gap-[7px] z-[1]">
	{@html coin}
<div class="monney-wrapper">
	{frontMoney}
</div>
</div>





<style lang="scss">
	.monney-wrapper {
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 1;

    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #E9E9E9;
	}
</style>