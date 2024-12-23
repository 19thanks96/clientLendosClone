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
    import SecondAppButton from '$lib/components/common/SecondAppButton.svelte';

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

<div class="z-[11] bg-black bg-opacity-90 absolute top-0 left-0 right-0  bottom-0 text-white overflow-hidden rounded-[32px] ">
    <div class='first-reward-element'>
        <RewardCongratulationText/>
    </div>
    <div class="third-reward-element balance-pos">
        <UserBalance {balance} isNotReward={false}/>
    </div>
    <div style="background-image: url('https://p2w.imgix.net/resources/client/dm/DMReward.png?auto=compress&auto=format');background-position: bottom; background-size: 100% 100%; " class='second-reward-element w-full h-full bg-cover bg-no-repeat  bg-black'>
    </div>
    <div style="background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 38.5%, rgba(0, 0, 0, 0.7) 61%, rgba(0, 0, 0, 0) 100%);"
         class="w-full h-[138px] fixed  right-0 bottom-0  z-[12]">

    </div>

    <RewardText on:holdReward={holdReward} {rewardAmount} {startAnimation}/>
    <div class="h-full w-full flex justify-center third-reward-element">
        <div id="claimRewardDmButton" style="opacity: {opacityButton}; transition: all 0.5s ease-out;"
             class='third-reward-element text-center w-[90%] h-[45px]  z-50 flex items-center justify-center fixed bottom-[4%] '>
            <SecondAppButton caption="Claim"  on:click={() => holdReward()} variant="reward"/>
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
