<script lang="ts">
    import {goto} from '$app/navigation';
    import {playerState} from '$lib/state/player.state';
    import {page} from "$app/stores";
		import Coin from "$lib/components/common/Coin.svelte";
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


<div tabindex="0"  on:click={onClickBalance} class="absolute h-[26px] rounded-[14px] bg-black  p-[4px_8px_4px_4px] flex flex-row gap-[7px] ">
	<div class={isNotReward ? '' : 'getPos'}>
	<Coin styleCoins="width: 18px; height: 18px;"/>
	</div>
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