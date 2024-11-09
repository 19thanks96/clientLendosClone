<script lang="ts">
    import coins from "$lib/components/piggy-bank/images/coins.svelte?raw";
    import multiplierCoins from "$lib/components/piggy-bank/images/multiplierCoins.svelte?raw";
    import Divider from './Divider.svelte'
    import MultiplierCoins from "./MultiplierCoins.svelte";
    import AddCoins from "./AddCoins.svelte";
    import Button from "./Button.svelte";
    import ProgressBar from "./ProgressBar.svelte";
    import Timer from "$lib/components/piggy-bank/components/Timer.svelte";
    import {playerState} from "$lib/state/player.state";
    import {pbState} from "$lib/state/pb.state";
    import {AdapterCommunicationService} from "$lib/adapter-listener";
    import {handleTutorialStep} from "$lib/tutorial.service";
    import {TutorialSteps} from "../../../../common/enums";
    import {rewardState} from "$lib/state/reward.state";
    import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
    import type {PiggyBankType} from "../../../../common/models/piggy-bank.type";
    import done from "$lib/components/piggy-bank/images/done.svelte?raw";


    export let piggyBank: PiggyBankType
    $:piggyBankBalance = piggyBank.balance
    $:piggyBankBalanceMax = piggyBank.balanceMax

    $: claimAllowed = piggyBank?.balanceMax > 0 && (piggyBank.balance / piggyBank.balanceMax) * 100 >= piggyBank.intermediateThreshold;
    $: holdAllowed = $playerState.tutorial && $playerState.tutorial.step === 2 ?
        $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance && $pbState.desiredHoldDepositAmount > 0 :
        $pbState.desiredHoldDepositAmount > 0;

    $:showDoneIconIntermediateThreshold = ((piggyBankBalanceMax * piggyBank.intermediateThreshold) / 100) <= piggyBankBalance


    function calculateReward(multiplierPercent: number) {
        return (piggyBank.balanceMax * multiplierPercent / 100) + piggyBank.balanceMax;
    }

    function calculateMultiplier(percentage: number, baseMultiplier = 1, maxMultiplier = 2) {
        return baseMultiplier + (percentage / 100) * (maxMultiplier - baseMultiplier);
    }

    const clickHold = () => {
        if (holdAllowed) {
            //#tutorial
            if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
                piggyBank.balance = $pbState?.bankRemainingBalance || 0;
                $playerState.general.balance = $playerState?.general?.balance - $pbState?.bankRemainingBalance;
                const pbClaimButton = document.getElementById('pbClaimButton');
                const coordinates = pbClaimButton?.getBoundingClientRect();
                AdapterCommunicationService.sendMessage({
                    type: 'track',
                    message: {type: 'clickTutorPbS2HoldButton'}
                });
                AdapterCommunicationService.sendMessage({
                    type: 'setTutorialCoordinates', message: {
                        element: 'pbClaimButton',
                        coordinates: {
                            x: coordinates?.x || 0,
                            y: coordinates?.y || 0,
                            width: coordinates?.width || 0,
                            height: coordinates?.height || 0
                        }
                    }
                })
            } else {
                $pbState.isLoading = true;
                AdapterCommunicationService.sendMessage(
                    {
                        type: 'pbHold',
                        message: {pbId: $pbState?.id, holdAmount: $pbState?.desiredHoldDepositAmount}
                    });
            }

        }
    }


    const clickClaim = () => {
        if (claimAllowed) {
            //#tutorial
            if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState?.desiredHoldDepositAmount === $pbState?.bankRemainingBalance) {
                AdapterCommunicationService.sendMessage({
                    type: 'track',
                    message: {type: 'clickTutorPbS3ClaimButton'}
                });
                handleTutorialStep(TutorialSteps.pbStep5);
            } else {
                $pbState.isLoading = true;
                $rewardState.entityId = piggyBank?.id || '';
                $userBalanceBeforeRewardState = $playerState?.general?.balance || 0;
                AdapterCommunicationService.sendMessage(
                    {
                        type: 'pbClaim',
                        message: {pbId: $pbState?.id}
                    });
                AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'})
            }
        }
    }

    const amountMaxReward = () => (piggyBank.balanceMax * piggyBank.finalMultiplierPercents / 100) + piggyBank.balanceMax
    const amountMinReward = () => (piggyBank.balanceMax * piggyBank.intermediateThreshold / 100) + piggyBank.balanceMax

    function calculateAdjustedMinReward() {
        const adjustedReward = (amountMinReward() - piggyBank.balanceMax) * piggyBank.intermediateMultiplierPercents / 100;
        return adjustedReward + (amountMinReward() - piggyBank.balanceMax);
    }

</script>
<section class="container">
    <div class="container__wrapper">
        <div class="container__multiplier__coins">
            <Divider amount={Math.round(piggyBank.balanceMax)}/>
            <MultiplierCoins coinsIcon={coins} amount={Math.round(amountMaxReward())}
                             multiplier={calculateMultiplier(piggyBank.finalMultiplierPercents)}/>
            {#if piggyBankBalance === piggyBankBalanceMax}
                <span class="absolute top-[10%] left-[30%] port:left-[34%]">{@html done}</span>
            {/if}
        </div>
        <div class="container__multiplier__coins">
            <Divider amount={Math.round(piggyBank.intermediateMultiplierReward || 0)}/>
            <MultiplierCoins coinsIcon={multiplierCoins} amount={Math.round(calculateAdjustedMinReward())}
                             multiplier={calculateMultiplier(piggyBank.intermediateMultiplierPercents)}/>
            {#if showDoneIconIntermediateThreshold}
                <span class="absolute top-[10%] left-[33%] port:left-[35%]">{@html done}</span>
            {/if}
        </div>
    </div>
    <div class="line"></div>
    <div class="container__addCoins">
        <div id="pbBetControls">
            <AddCoins maxAmount={piggyBank.balance}/>
        </div>
        <p class="addCoins__text">Fill the indicator to increase your reward</p>
        <div class="container__buttons">
            <div id="pbHoldButton">
                <Button
                        text={piggyBank?.ctaCaptionHold}
                        className={holdAllowed ? "main" : "disabled"}
                        on:click={clickHold}
                        isLoading={$pbState?.isLoading}
                />
            </div>
            <div id="pbClaimButton">
                <Button
                        text={piggyBank?.ctaCaptionClaim}
                        className={claimAllowed ? "claim" : "claimDisabled" }
                        on:click={clickClaim}
                        isLoading={$pbState?.isLoading}
                />
            </div>
        </div>
        <Timer endDate={piggyBank.dateEnd}/>
        <ProgressBar maxValue={piggyBankBalanceMax} currentValue={piggyBankBalance}/>
    </div>
</section>


<style>
    .container {
        height: 600px;
        width: 400px;
        margin-top: -50px;
        background-image: url("/src/lib/components/piggy-bank/images/backgroundContainer.svg");
        background-size: 400px 600px;
        position: relative;
    }

    .addCoins__text {
        font-family: "Fira Sans", sans-serif;
        font-weight: 500;
        font-size: 17px;
        color: rgba(213, 218, 245, 1)
    }

    .container__addCoins {
        width: 380px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-direction: column;
        padding-left: 10px;
    }

    .container__buttons {
        height: 50px;
        width: 380px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    .line {
        height: 2px;
        width: 380px;
        background-color: darkblue;
        position: absolute;
        left: 2.5%;
        top: 67%;
    }

    .container__wrapper {
        margin-top: 150px;
    }

    .container__multiplier__coins {
        height: 130px;
        width: 380px;
        margin-left: 10px;
        background-image: url("/src/lib/components/piggy-bank/images/Layer.svg");
        background-size: contain;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    @media screen and (max-width: 450px) {
        .container {
            width: 350px;
            height: 500px;
            background-size: 360px 450px;
            background-repeat: no-repeat;
            margin-top: -20px;
            margin-right: 30px;
        }

        .container__wrapper {
            margin-top: 100px;
        }

        .container__multiplier__coins {
            height: 100px;
            width: 300px;
            background-size: 310px 110px;
            margin-left: 30px;
        }

        .line {
            width: 285px;
            top: 60%;
            left: 11%;
        }

        .container__addCoins {
            width: 300px;
            height: 120px;
            align-items: flex-start;
            padding-left: 50px;
            padding-top: 5px;
        }

        .addCoins__text {
            font-size: 13px;
            padding-left: 10px;
        }

        .container__buttons {
            height: 35px;
            width: 300px;
            justify-content: normal;
            gap: 15px;
            padding-top: 5px;
        }

        .container__timer {
            width: 140px;
            height: 140px;
            background-size: 140px 140px;
            bottom: -3%;
            left: 32%;
        }

        .container__timer__text {
            font-size: 11px;
        }

        .container__timer__time {
            font-size: 12px;
        }
    }
</style>