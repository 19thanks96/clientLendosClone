<script lang="ts">
    import BgImage from '$lib/components/scratching-cards/BgImage.sc.svelte';
    import UserBalance from '$lib/components/common/Money.svelte';
    import ExitButton from '$lib/components/common/ExitButton.svelte';
    import MusicButton from '$lib/components/common/MusicButton.svelte';
    import MainBlock from '$lib/components/scratching-cards/MainBlock.svelte';
    import CapMainBlock from '$lib/components/scratching-cards/CapMainBlock.svelte';
    import Info from '$lib/components/common/Info.svelte';


    let money: number = 500;
    let maxWin: number = 1000000;
    let scratchPrice: number = 100;

    // onMount(() => setTimeout(() => sendMessageToParent({ type: 'appLoaded' }), 200));

</script>


<div style='height: 100dvh;' class=" w-screen overflow-hidden">
    <BgImage bgImage={`https://p2w.imgix.net/resources/client/sc/Bg_Forest_SC.png?auto=compress&auto=format`}>
        <UserBalance balance={money} img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
        <Info background={`https://p2w.imgix.net/resources/client/store/Btn_Cmn_S_Violet_Active.png?auto=compress&auto=format`}
              image={'https://p2w.imgix.net/resources/client/store/Icn_Cmn_Info.png?auto=compress&auto=format'}
              bgPopup={`https://p2w.imgix.net/resources/client/dm/Cmt_Cmn_Bg_Ovrl_Viloet.png?auto=compress&auto=format`}
              text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}/>
        <ExitButton background={`https://p2w.imgix.net/resources/client/dm/Btn_Red_S.png?auto=compress&auto=format`}
                    image={`https://p2w.imgix.net/resources/client/dm/Icn_Close.png?auto=compress&auto=format`}/>
        <MusicButton background={`https://p2w.imgix.net/resources/client/dm/Btn_Violet_S.png?auto=compress&auto=format`}
                     image={`https://p2w.imgix.net/resources/client/dm/Icn_Sound.png?auto=compress&auto=format`}/>
        <MainBlock balance={money} maxWin={maxWin} price={scratchPrice}>
            <CapMainBlock slot='header'/>
        </MainBlock>
    </BgImage>
</div>
