<script lang="ts">
    import pig from "$lib/components/piggy-bank/images/pig.svelte?raw";
    import pillow from "$lib/components/piggy-bank/images/pillow.svelte?raw";
    import coin from "$lib/components/piggy-bank/images/coin.svelte?raw";
    import Button from "./Button.svelte";
    import {createEventDispatcher} from "svelte";
    import {playerState} from "$lib/state/player.state";
    import {goto} from "$app/navigation";
    import {AdapterCommunicationService} from "$lib/adapter-listener";
    import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
    import {MissionStatus} from "../../../../common/models/mission.type";
    import {enrichTutorialMissions} from "$lib/tutorial.service";
    import {rewardState} from "$lib/state/reward.state";
    import overlayStars from "$lib/components/piggy-bank/images/overlayStars.svelte?raw";
    import RewardText from "$lib/components/reward/RewardText.svelte";
    import UserBalance from "$lib/components/common/Money.svelte";
    import SpinningLight from "$lib/components/reward/SpinningLight.svelte";

    export let balance: number;
    export let rewardAmount: number;
    let dispatch = createEventDispatcher();
    let startAnimation: boolean = false
    let opacityButton = 1
    let interval: number;

    const decreaseAmount = rewardAmount / 200;
    const redirectOrHideAfterTimeout = () => {
        if (!!$playerState.store && $playerState.store.offers.length !== 0 && !$playerState.mg.missions.some((m => m.missionType === 'pbClaim' && m.status === 'completed'))) {
            goto('/store')
        } else if (!!$playerState.mg && $playerState.mg.missions.length !== 0) {
            goto('/dm')
        } else {
            AdapterCommunicationService.sendMessage({type: 'exit', message: 'click'})
        }
    }
    const addNumber = () => {
        rewardAmount -= decreaseAmount;
        $userBalanceBeforeRewardState += decreaseAmount;
        if (rewardAmount <= 0) {
            rewardAmount = balance
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
            if (rewardAmount !== 0) {
                interval = setInterval(addNumber, 10);
            }
        }, 1000)
    }


</script>
<div class="overlay">
    <section class="reward">
        <RewardText rewardAmount={rewardAmount} {startAnimation}/>
        <div class="fixed w-full h-full top-0 flex justify-center items-center">
            <SpinningLight
                    image={'https://p2w.imgix.net/resources/client/dm/FX_Overlay_Yellow.png?auto=compress&auto=format'}/>
        </div>
        <UserBalance balance={$userBalanceBeforeRewardState}
                     img={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}/>
        <div class="overlayStars">{@html overlayStars}</div>
        <div class="reward__title">
            <span class="reward__title__text" data-text={"You"}>You</span>
            <br>
            <span class="reward__title__text" data-text={"Open Box"}>Open Box</span>
        </div>
        <div class="pig__wrapper">
            <div class="pig">
                {@html pig}
            </div>
            <div class="pillow">
                {@html pillow}
            </div>
        </div>
        <div class="amount__reward"></div>
        <div class="button__wrapper">
            <Button text="Claim" className="main" on:click={claimRewardWithRedirect}/>
        </div>
    </section>
</div>

<style>
    .overlay {
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(rgba(40, 113, 223, 0.7), rgba(5, 17, 40, 0.63)); /* Background for the Info overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10;
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
    }

    .amount__reward {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        position: relative;
    }

    .pig__wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        position: relative;
        margin-bottom: 50px;
    }

    .pillow {
        position: absolute;
        top: 38%;
        left: 16%;
        z-index: 1;
    }

    .pig {
        z-index: 2;
    }

    .overlayStars {
        position: absolute;
    }

    .reward {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        gap: 55px;
        position: relative;
    }

    .pig__wrapper {
        width: 500px;
        height: 350px;
        background-image: url("/src/lib/components/piggy-bank/images/backgroundReward.svg");
        background-repeat: no-repeat;
        background-size: contain;
    }

    .reward__title {
        text-align: center;
        padding-bottom: 35px;
    }

    .reward__title__text {
        font-size: 58px;
        font-family: "Fira Sans", sans-serif;
        font-weight: 900;
        background: -webkit-linear-gradient(90deg, rgba(255, 248, 214, 1), rgba(255, 246, 24, 1), rgba(255, 205, 3, 1) 50%, rgba(255, 248, 89, 1) 50%);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        position: relative;
        z-index: 1;
        text-transform: uppercase;
    }

    .reward__title__text::before {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        color: transparent;
        text-transform: uppercase;
        pointer-events: none;
        white-space: nowrap;
        text-shadow: 0 -2px 0 rgba(173, 90, 35, 1);
        z-index: -1;
    }

    @media screen and (max-width: 450px) {
        .reward {
            gap: 5px;
            height: 300px;
            width: 300px;
            background-size: contain;
        }

        .pig__wrapper {
            width: 400px;
            height: 400px;
            background-size: contain;
            /*margin-bottom: 25px;*/
        }

        .pig {
            padding-top: 50px;
            padding-bottom: 60px;
        }

        .pillow {
            top: 43%;
            left: 18%;
        }

        .amount__icon {
            top: 55%;
        }

        .reward__title__text {
            font-size: 48px;
        }

        .amount__reward {
            margin-left: 20px;
            margin-top: -10px;
            margin-bottom: 40px;
        }

        .button__wrapper {
            margin-top: 30px;
        }

    }
</style>