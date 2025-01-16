<script lang="ts">

	import { base } from '$app/paths';
	import PbSlider from '$lib/components/piggy-bank/reskin/PbSlider.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import PbProgressBar from '$lib/components/piggy-bank/reskin/PbProgressBar.svelte';
	import PbCard from '$lib/components/piggy-bank/reskin/PbCard.svelte';
	import type { PiggyBankType } from '../../../../common/models/piggy-bank.type';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import { handleTutorialStep } from '$lib/tutorial.service';
	import { TutorialSteps } from '../../../../common/enums';
	import { pbState } from '$lib/state/pb.state';
	import { playerState } from '$lib/state/player.state';
	import { rewardState } from '$lib/state/reward.state';
	import { userBalanceBeforeRewardState } from '$lib/state/oldUserBalance.state';


	export let piggyBank: PiggyBankType;

	$: claimAllowed = piggyBank?.balanceMax > 0 && (piggyBank.balance / piggyBank.balanceMax) * 100 >= piggyBank.intermediateThreshold;
	$: holdAllowed = $playerState.tutorial && $playerState.tutorial.step === 2 ?
		$pbState.desiredHoldDepositAmount === $pbState.bankRemainingBalance && $pbState.desiredHoldDepositAmount > 0 :
		$pbState.desiredHoldDepositAmount > 0;



	function calculateMultiplier(percentage: number, baseMultiplier = 1, maxMultiplier = 2) {
		return baseMultiplier + (percentage / 100) * (maxMultiplier - baseMultiplier);
	}

	const amountMaxReward = () => (piggyBank.balanceMax * piggyBank.finalMultiplierPercents / 100) + piggyBank.balanceMax;
	const amountMinReward = () => (piggyBank.balanceMax * piggyBank.intermediateThreshold / 100) + piggyBank.balanceMax;

	function calculateAdjustedMinReward() {
		const adjustedReward = (amountMinReward() - piggyBank.balanceMax) * piggyBank.intermediateMultiplierPercents / 100;
		return adjustedReward + (amountMinReward() - piggyBank.balanceMax);
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
					message: { type: 'clickTutorPbS2HoldButton' }
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
				});
			} else {
				$pbState.isLoading = true;
				AdapterCommunicationService.sendMessage(
					{
						type: 'pbHold',
						message: { pbId: $pbState?.id, holdAmount: $pbState?.desiredHoldDepositAmount }
					});
			}

		}
	};


	const clickClaim = () => {
		if (claimAllowed) {
			//#tutorial
			if ($playerState.tutorial && $playerState.tutorial.step === 2 && $pbState?.desiredHoldDepositAmount === $pbState?.bankRemainingBalance) {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: { type: 'clickTutorPbS3ClaimButton' }
				});
				handleTutorialStep(TutorialSteps.pbStep5);
			} else {
				$pbState.isLoading = true;
				$rewardState.entityId = piggyBank?.id || '';
				$userBalanceBeforeRewardState = $playerState?.general?.balance || 0;
				AdapterCommunicationService.sendMessage(
					{
						type: 'pbClaim',
						message: { pbId: $pbState?.id }
					});
				AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
			}
		}
	};
</script>

<div id="pbBetControls" class=" flex flex-col items-center p-0 relative pb-main-wrapper pbBetControls">

	<PbProgressBar pb={piggyBank} />
	<div style='background-image: url({base}/reskin/safe.png)'
			 class="w-[30px] h-[30px] bg-contain bg-no-repeat absolute top-0 left-[10px] z-[3]">
	</div>

	<div class="w-full pt-[8px]">

		<PbCard currentBalance={$playerState.pb.balance} on:click={clickClaim} id='pbClaimButton'
						price={piggyBank.balanceMax }
						priceDescription='mega reward' finalCoins={Math.round(amountMaxReward())}
						multiplier={calculateMultiplier(piggyBank.finalMultiplierPercents)} />
	</div>
	<div class="w-full pt-[8px]">

		<PbCard currentBalance={ $playerState.pb.balance}   on:click={clickClaim} id='pbClaimIntermediateButton'
						price={piggyBank.balanceMax / 100 * piggyBank.intermediateMultiplierPercents}
						priceDescription='Space reward' finalCoins={Math.round(calculateAdjustedMinReward())}
						multiplier={calculateMultiplier(piggyBank.intermediateMultiplierPercents)} />

	</div>
	<div class="w-full h-[100px] flex justify-center items-center relative">
		<PbSlider />
	</div>
	<div id="pbHoldButton" class="w-[340px] h-[44px] flex justify-center items-center">

		<AppButton
			on:click={clickHold}
			isLoading={$pbState?.isLoading}
			caption={'Deposit'}
			color={'green'}
			isActive={holdAllowed}
			bigButton={true}
			id=''
		/>
	</div>
</div>

<style lang="scss">
  .pb-main-wrapper {
    width: 100%;
    height: 410px;
    left: 0;
    top: 190px;
    /*gap: 8px;*/
    overflow-y: scroll;
    scrollbar-width: none;
  }


</style>