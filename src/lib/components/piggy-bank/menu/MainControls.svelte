<script lang="ts">
    import ProgressBar from './ProgressBar.svelte';
    import AdjustTopUpControls from './AdjustTopUpControls.svelte';
    import TimerLayout from './TimerLayout.svelte';
    import {t} from '$lib/i18n/config';
    import type {PiggyBankType} from "../../../../common/models/piggy-bank.type";
    import {pbState} from "$lib/state/pb.state";

    import {AdapterCommunicationService} from "$lib/adapter-listener";
    import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state.js";

    import {playerState} from "$lib/state/player.state";
    import {base} from '$app/paths';
    import AppButton from "$lib/components/common/AppButton.svelte";
    import {rewardState} from "$lib/state/reward.state";
    import {handleTutorialStep} from "$lib/tutorial.service";
    import {TutorialSteps} from "../../../../common/enums";

    const bg_img: string = `${base}/svg/Cmt_Mb_Bg_PopUp.svg`

    export let pb: PiggyBankType;

    $: percent = pb?.balanceMax === 0 ? 0 : pb?.balance / pb?.balanceMax * 100;

    $: claimAllowed = pb?.balanceMax === 0 ? false : (pb?.balance / pb?.balanceMax) * 100 >= pb?.intermediateThreshold;
    //#tutorial
    $: holdAllowed = $playerState.tutorial && $playerState.tutorial?.step === 2 ?
        $pbState?.desiredHoldDepositAmount === $pbState?.bankRemainingBalance && $pbState?.desiredHoldDepositAmount > 0 :
        $pbState?.desiredHoldDepositAmount > 0;


    const clickHold = () => {
        console.log(holdAllowed)
        if (holdAllowed) {
            //#tutorial
            if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance) {
                pb.balance = $pbState?.bankRemainingBalance || 0;
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
                $rewardState.entityId = pb?.id || '';
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
</script>

<div class="w-full flex justify-center items-center">
    <!--id="pbHoldButton"-->
    <div class=" vhBigHeight-[380] vhBigWidth-[640] port:h-[28.229vh] port:w-[47.396vh]">
        <TimerLayout dateEnd={pb.dateEnd}></TimerLayout>
        <div style={`border-image-source: url(${bg_img});`}
             class="relative w-full h-full px-[5vh] py-[1vh] port:px-[7.5vw] main-block flex flex-col justify-evenly ">
            <div class="h-[25%] w-[110%] self-center">
                <ProgressBar progress={percent}
                             intermediateUnlockPercents={pb?.intermediateThreshold}
                             intermediateMultiplierPercents={pb?.intermediateMultiplierPercents}
                             finalMultiplierPercents={pb?.finalMultiplierPercents}/>
            </div>


            <div class="w-[115%] self-center ">
                <p class="text-center vhFont-[26] port:text-[3.426vw] leading-[1.2] font-['Fira_Sans'] font-medium text-[#808C98]  ">
                    {$t('pb.txt_mtvn')}
                </p>
            </div>

            <div id="pbBetControls" class="bg-[#EFF7FD] rounded-xl flex justify-center h-[5vh] port:h-[7.13vw] w-full">
                <AdjustTopUpControls/>
            </div>


            <div class="flex p-[1%] items-center justify-center  ">
<!--                <div id="pbHoldButton"-->
<!--                     class="flex justify-center items-center content-center text-center vhBigFont-[38] port:text-[2.76vh]  leading-[1.06] vhBigHeight-[92] vhBigWidth-[258] port:h-[11.111vw]">-->
<!--                    <AppButton on:click={clickHold} isLoading={$pbState?.isLoading} isActive={holdAllowed}-->

<!--                               showBorderWhenInactive={true}-->
<!--                               caption={pb?.ctaCaptionHold} translate={false} bigButton={true}-->
<!--                               color={'green'}>-->

<!--                    </AppButton>-->
<!--                </div>-->

<!--                <div id="pbClaimButton"-->
<!--                     class="pl-2 flex justify-center items-center content-center text-center vhBigHeight-[92] vhBigWidth-[258]  port:h-[11.111vw]  vhBigFont-[38] port:text-[2.76vh] leading-[1.06]">-->
<!--                    <AppButton on:click={clickClaim} isLoading={$pbState?.isLoading} isActive={claimAllowed}-->
<!--                               showBorderWhenInactive={true}-->
<!--                               caption={pb?.ctaCaptionClaim} translate={false} bigButton={true}-->
<!--                               color={'yellow'}></AppButton>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</div>

<style>
    .main-block {
        border-image-slice: 90 fill;
        border-image-width: 4vw;
        border-image-outset: 1px;
        border-image-repeat: stretch;
    }

    @media (orientation: portrait) {
        .main-block {
            border-image-width: 12vw;
        }
    }
</style>
