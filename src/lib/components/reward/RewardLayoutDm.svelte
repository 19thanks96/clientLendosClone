<script lang="ts">
    import {base} from '$app/paths'
    import SpinningLight from './SpinningLight.svelte';
    import ScaledImg from './ScaledImg.svelte';
    import RewardText from './RewardText.svelte';
    import {createEventDispatcher} from "svelte";
    import RewardCongratulationText from './RewardCongratulationText.svelte';
    import AppButton from "$lib/components/common/AppButton.svelte";
    import UserBalance from '$lib/components/common/Money.svelte';
    import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
    import {AdapterCommunicationService} from '$lib/adapter-listener';
    import {rewardState} from "$lib/state/reward.state";
    import {playerState} from "$lib/state/player.state";
    import {MissionStatus} from "../../../common/models/mission.type";
    import {enrichTutorialMissions} from "$lib/tutorial.service";
    import {tutorialState} from "$lib/state/tutorial.state";

    let balance = $userBalanceBeforeRewardState;
    export let rewardAmount: number


    let opacityButton = 1
    let startAnimation = false;
    let interval;
    const decreaseAmount = rewardAmount / 200;

    const dispatch = createEventDispatcher();


    const addNumber = () => {
        rewardAmount -= decreaseAmount
        balance += decreaseAmount
        if (rewardAmount <= 0) {
            rewardAmount = balance
            clearInterval(interval);
            setTimeout(() => {
                dispatch('close')
                AdapterCommunicationService.sendMessage({type: 'hidePopup', message: 'click'})

            }, 1000)
        }
    };

    const holdReward = () => {
        //#tutorial
        if ($playerState.tutorial?.step === 1) {
            let missionReward;
            $playerState.mg.missions = $playerState.mg.missions.map((m) => {
                if (m.id === 'mgTutorialMission') {
                    m.status = MissionStatus.inactive;
                    missionReward = m.rewards;
                }
                return m;
            });
            $playerState.general.balance = $playerState.general.balance + missionReward;
            $playerState.mg.missions = enrichTutorialMissions([...$playerState.mg.missions, ...$tutorialState.missions], $playerState.tutorial, 'piggyBank');
            AdapterCommunicationService.sendMessage({
                type: 'hideTutorialHints',
            });
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickTutorDmS4ClaimButton'}
            });
            AdapterCommunicationService.sendMessage({
                type: 'tutorialProgress',
                message: {step: 1}
            });
            $playerState.tutorial.step = 2;
        } else {
            AdapterCommunicationService.sendMessage({
                type: 'track',
                message: {type: 'clickGetMissionReward', entityId: $rewardState?.entityId}
            });
        }
        startAnimation = true;
        opacityButton = 0;
        setTimeout(() => {
            if (rewardAmount !== 0) {
                interval = setInterval(addNumber, 10);
            }
        }, 1000)
    }
</script>

<div class="z-[11] bg-black bg-opacity-90 absolute top-0 left-0 right-0  bottom-0 text-white overflow-hidden ">
    <div class='first-reward-element'>
        <RewardCongratulationText/>
    </div>
    <div class="third-reward-element balance-pos">
        <UserBalance {balance}
                     img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
    </div>
    <div class='second-reward-element w-full h-full'>
        <SpinningLight
                image={'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'}/>
        <ScaledImg image={'https://p2w.imgix.net/resources/client/dm/Img_Win_DM1.png?auto=compress&auto=format'}
                   starsImage={base + '/newImg/Fx_Cmn_Overlay_Yellow.svg'}
                   />
    </div>

    <RewardText on:holdReward={holdReward} {rewardAmount} {startAnimation}/>
    <div class="h-full w-full flex justify-center third-reward-element">
        <div id="claimRewardDmButton" style="opacity: {opacityButton}; transition: all 0.5s ease-out;"
             class='absolute third-reward-element text-center vhFont-[16] port:text-[3.148vw] vwWidth-[122] vhHeight-[40] leading-[1.2] port:w-[23.704vw] port:h-[7.778vw] z-50 flex items-center justify-center fixed bottom-[6.75%] port:bottom-[6.25%]'>
            <AppButton color="green" caption="Claim" isActive={true} on:click={() => holdReward()}/>
        </div>
    </div>

</div>


<style>

    @keyframes show-reward {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }

    }

    .first-reward-element {
        animation: show-reward 0.1s ease-in-out;
    }

    .second-reward-ement {
        animation: show-elements 0.75s ease-in-out;
    }

    .third-reward-element {
        animation: show-elements 1.25s ease-in-out;
    }

    @keyframes show-elements {
        0% {
            opacity: 0;
        }
        90% {
            opacity: 0;

        }
        100% {
            opacity: 1;
        }
    }
</style>
