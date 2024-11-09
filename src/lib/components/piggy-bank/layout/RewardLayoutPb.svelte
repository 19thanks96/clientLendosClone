<script lang="ts">
    import {base} from '$app/paths'
    import AppButton from '$lib/components/common/AppButton.svelte';
    import SpinningLight from '../../reward/SpinningLight.svelte';
    import {t} from '$lib/i18n/config';
    import UserBalance from '$lib/components/common/Money.svelte';
    import {playerState} from "$lib/state/player.state";
    import RewardText from '$lib/components/reward/RewardText.svelte';
    import {createEventDispatcher} from "svelte";
    import {goto} from "$app/navigation";
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {userBalanceBeforeRewardState} from '$lib/state/oldUserBalance.state';
    import {rewardState} from "$lib/state/reward.state";
    import {MissionStatus} from "../../../../common/models/mission.type";
    import {enrichTutorialMissions} from "$lib/tutorial.service";

    export let balance: number;
    export let amount: number;
    let dispatch = createEventDispatcher();
    let startAnimation: boolean = false
    let opacityButton = 1
    let interval: number;
    // decreaseAmount = amount / (2s = 200 * timeout AddNumber)
    const decreaseAmount = amount / 200;
    const redirectOrHideAfterTimeout = () => {
        if (!!$playerState.store && $playerState.store.offers.length !== 0) {
            goto('/store')
        } else if (!!$playerState.mg && $playerState.mg.missions.length !== 0) {
            goto('/dm')
        } else {
            AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'})
        }
    }
    const addNumber = () => {
        amount -= decreaseAmount;
        $userBalanceBeforeRewardState += decreaseAmount;
        if (amount <= 0) {
            amount = balance
            clearInterval(interval);
            setTimeout(() => {
                dispatch('close')
                AdapterCommunicationService.sendMessage({type: 'hidePopup', message: 'click'})
                //#tutorial
                if ($playerState.tutorial?.step === 2) {
                    let missionReward;
                    $playerState.mg.missions = $playerState.mg.missions.map((m) => {
                        if (m.id === 'mgTutorialPb') {
                            m.status = MissionStatus.inactive;
                            missionReward = m.rewards;
                        }
                        return m;
                    });
                    $playerState.general.balance = $playerState.general.balance + (missionReward * 2);
                    $playerState.mg.missions = enrichTutorialMissions($playerState.mg.missions, $playerState.tutorial, 'store');
                    AdapterCommunicationService.sendMessage({
                        type: 'tutorialProgress',
                        message: {step: 2}
                    });
                    $playerState.tutorial.step = 3;
                } else {
                    redirectOrHideAfterTimeout()
                }

            }, 1000)
        }
    };


    const claimRewardWithRedirect = () => {
        //#tutorial
        if ($playerState.tutorial?.step === 2) {
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickTutorPbS4ClaimButton'}
            });
            AdapterCommunicationService.sendMessage({
                type: 'hideTutorialHints',
            });
        }
        AdapterCommunicationService.sendMessage({
            type: 'track',
            message: {type: 'clickGetPbReward', entityId: $rewardState?.entityId}
        });
        opacityButton = 0;
        startAnimation = true;


        setTimeout(() => {
            if (amount !== 0) {
                interval = setInterval(addNumber, 10);
            }
        }, 1000)
    }
    const firstWordCongratulationText = $t('pb.txt_pb_rew').split(' ')[0]
    const lastWordCongratulationText = $t('pb.txt_pb_rew').substring($t('pb.txt_pb_rew').indexOf(' ') + 1)

</script>

<div class="absolute top-0 left-0 bottom-0 right-0 overflow-hidden blck_screen">

    <RewardText rewardAmount={amount} {startAnimation}/>

    <UserBalance balance={$userBalanceBeforeRewardState}
                 img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>

    <div class="open_box text-center vwFont-[69] leading-[1.15] font-black font-['Fira_Sans'] port:text-[7.604vh] flex justify-center items-center flex-col mt-[3%] port:mt-[10%]">
        <div>
            {firstWordCongratulationText.toUpperCase()}
        </div>
        <div class="land:ml-[2vw]">
            {lastWordCongratulationText.toUpperCase()}
        </div>
    </div>
    <div class="fixed w-full h-full top-0 flex justify-center items-center">
        <SpinningLight
                image={'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'}/>
    </div>


    <div class="flex w-full  justify-center">
        <div  style="background-image: url({base + '/newImg/Fx_Cmn_Overlay_Yellow.svg'}); transform: translate(-50%, -50%); background-size: 100% 100%;" class="absolute  bg-center bg-no-repeat h-[42vw] w-[42vw] top-1/2 left-1/2"></div>
        <div class="fixed top-[47.5vh] translate-y-[-50%] port:translate-y-[-65%]  flex justify-center items-center">
            <div class=" absolute w-[45vw] port:w-[100vw] flex justify-center items-center">
                <div style="background-image: url('{`https://p2w.imgix.net/resources/client/pb/Img_Coins_Win.png?auto=compress&auto=format`}')"
                     class="land:mt-[-9%] vwWidth-[489] vwHeight-[347] port:w-[95.093vw] port:h-[67.407vw] revative z-10  bg-contain bg-no-repeat"></div>
            </div>
            <div class="relative flex justify-center items-center  mt-[12%] port:mt-[20%] z-50">

                <div class="relative flex justify-center mb-[-2%] port:mb-[-21%] vwWidth-[328] vwHeight-[242]  mx-auto port:w-[63.796vw] port:h-[47.037vw] z-10">
                    <div style="background-image: url('https://p2w.imgix.net/resources/client/pb/Pillow.png?auto=compress&auto=format')"
                         class=" vwWidth-[328] vwHeight-[124] port:w-[63.704vw] translate-x-[1%] bg-cover bg-no-repeat port:h-[24.167vw]  bottom-0  z-10 absolute "
                         alt="piggy"/>
                    <img src="https://p2w.imgix.net/resources/client/pb/Pig.png?auto=compress&auto=format"
                         style="aspect-ratio: 12/9;"
                         class=" vwWidth-[178] vwHeight-[176] port:w-[34.722vw] port:h-[34.167vw] revative z-10 "
                         alt="piggy"/>
                </div>
            </div>

        </div>

    </div>
    <div class="text-white flex flex-col justify-center items-center fixed w-full vhBigFont-[48] port:text-[2.5vh] leading-[1.2]  z-60 bottom-[15vh]">
        <div id="claimRewardPbButton" style="opacity: {opacityButton}; transition: all 0.5s ease-out;"
             class="vhHeight-[40] vwWidth-[122] port:h-[7.778vw] port:w-[23.704vw] fixed bottom-[6vh] vhFont-[16.2] port:text-[3.148vw] ">
            <AppButton caption={"Claim"} color={'green'} isActive={true}
                       on:click={claimRewardWithRedirect}/>
        </div>
    </div>

</div>


<style>
    .blck_screen {
        background-color: rgba(12, 10, 22, 0.9);
        z-index: 999;
    }

    .open_box {
        background: linear-gradient(to bottom, #FFF617, #e6aa65);
        color: transparent;
        -webkit-background-clip: text;
        -webkit-text-stroke-color: #C60909;
        -webkit-text-stroke-width: 0.7px;
        filter: drop-shadow(2px 5px #B84201);
    }

</style>
