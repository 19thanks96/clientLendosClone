<script lang="ts">
    import AppButton from "$lib/components/common/AppButton.svelte";
    import RewardLayoutScratch from './RewardLayoutScratch.svelte';
    import ScratchItem from './ScratchItem.svelte';
    import {scratchState} from "$lib/state/scratch.state";


    export let balance: number;
    export let maxWin: number;
    export let price: number;
    let frontMoney = maxWin.toLocaleString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
    let scratchText = [
        'You win!',
        'You lose'
    ]

    function handleScratch(e: MouseEvent): void {
        $scratchState.isScratch = true
        $scratchState.isSratchBtnClck = true
    }

    function handleRewardScratch() {
        if ($scratchState.isScratch) {
            $scratchState.isOpen = true
        }
    }


</script>

<div style={`border-image-source: url(https://p2w.imgix.net/resources/client/sc/Bg_PopUp.png?auto=compress&auto=format)`}
     class="relative vhWidth-[489] vhHeight-[763] port:w-[34.115vh] port:h-[54.115vh]  mt-[0%] main-block">
    <div class="relative w-[122%] h-[100%]  top-0 left-[50%] " style="transform: translate(-48.5%, -47%);">
        <slot name="header"/>
    </div>
    <div class="flex justify-center items-center flex-col w-full h-full absolute top-[-4vw]">
        <div class=" w-full h-full relative mt-[-5vw] port:mt-[-33%] port:w-[34vh]">
            <img src='https://p2w.imgix.net/resources/client/sc/FX_Stars_Left.png?auto=compress&auto=format'
                 class="absolute top-[17vh] left-[6vh] port:top-[13vh] port:left-[4vh] vhHeight-[115] port:w-[8.385vh] port:h-[8.229vh] vhWidth-[113] z-[2]"
                 alt="FX_Stars_Left.png">
            <div style="background-image: url('https://p2w.imgix.net/resources/client/sc/Img_PopUp_Pot_SC.png?auto=compress&auto=format');"
                 class="absolute top-0 left-0 w-full h-4/5 bg-contain bg-no-repeat bg-top"></div>
            <img src='https://p2w.imgix.net/resources/client/sc/FX_Stars_Right.png?auto=compress&auto=format'
                 class="absolute top-[18vh] right-[5vh] port:top-[13vh] port:right-[4vh] port:w-[6.927vh] port:h-[9.115vh] vhHeight-[125] vhWidth-[95] z-[2]"
                 alt="FX_Stars_Right.png">
        </div>
        <div class="fixed h-1/3 w-[45.27vh] port:w-[34.115vh] flex justify-start items-center flex-col fixed-text">
            <div class="flex justify-center  items-center self-center flex-col  w-[90%]  gap-[20%]">
                <div class="font-ChangaOne vhFont-[38] port:text-[2.6vh]"
                     style=" font-style: normal; font-weight: 400;  line-height: 1; background: linear-gradient(0deg, #FFCB13 17.8%, #FFF730 67.43%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; color:transparent; filter: drop-shadow(2px 2px #0A4A2B);">
                    Up to:
                </div>
                <div style=" background: rgba(9, 26, 27, 0.1); box-shadow: 0px 2px 0px rgba(73, 174, 88, 0.6), inset 0px 2px 4px rgba(14, 62, 34, 0.8);"
                     class="w-full vhHeight-[60] port:h-[4.427vh] rounded-[1.852vh]">
                    <div style="  font-style: normal;   color: #FFFFF7; text-shadow: 0.2vh 0.5vh 0px #151413;"
                         class="front-money py-[2vh] leading-[3.3vh] flex justify-center items-center h-full relative font-ChangaOne vhFont-[33.5] port:text-[2.448vh] port:leading-[2.552vh]">
                        <div style="content: ''; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format');"
                             class="absolute vhHeight-[47] w-[13%] ml-[-15%] port:ml-[-20%] left-[32.5%] bg-contain bg-no-repeat"></div>
                        {frontMoney}
                    </div>
                </div>
            </div>
            <ScratchItem color='silver' text={scratchText[0]}/>
            <div style="  font-style: normal; font-weight: 400;  color: #FFFFF7; text-shadow: 0.2vh 0.5vh 0px #151413;"
                 class="flex flex-row relative vhHeight-[24] leading-[2.4074vh] vhFont-[24] font-ChangaOne">
                <div>{balance}</div>
                <div>/</div>
                <div>{price}</div>
                <div style="content: ''; background-image: url('https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format');"
                     class="absolute vhHeight-[34] w-[50%] ml-[-30%] bg-contain bg-no-repeat"></div>
            </div>
        </div>


        <div class="vhWidth-[258] vhHeight-[92] port:w-[18.802vh] port:h-[6.719vh] mt-[1vh] vhFont-[38] port:text-[2.76vh] leading-[1.06] absolute bottom-[-3vw] port:bottom-0 z-10">
            <AppButton on:click={handleScratch} color="green" caption="Scratch 12" showBorderWhenInactive={true}/>
        </div>
    </div>
    <div class="w-full vhHeight-[111] port:h-[8vh] flex justify-center items-center absolute bottom-[-17.5%] left-[0%] vhFont-[38] port:text-[2.76vh] leading-[1.06]">
        <AppButton on:click={handleRewardScratch} isActive={$scratchState.isScratch} color="yellow"
                         caption="Claim" showBorderWhenInactive={true}/>
    </div>
</div>
<RewardLayoutScratch rewardAmount={Number(balance)} showRewardLayout={$scratchState.isOpen}
                     on:close={() => $scratchState.isOpen = false }/>


<style lang="css">
    .main-block {
        border-image-slice: 90 fill;
        border-image-width: 4vw;
        border-image-outset: 0px;
        border-image-repeat: stretch;
    }

    .fixed-text {
        transform: translateY(66%);
    }

    @media (orientation: portrait) {
        .fixed-text {
            transform: translateY(55%);
        }

    }

</style>
