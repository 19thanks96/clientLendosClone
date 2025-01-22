<script lang="ts">
	import { type Mission, MissionStatus } from '../../../common/models/mission.type';
	import AboutMissionText from './AboutMissionText.svelte';
	import RenderMissionImg from './RenderMissionImg.svelte';
	import MissionStatusBlock from './MissionStatusBlock.svelte';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import { onMount } from 'svelte';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import { missionClaimState } from '$lib/state/missionClaim.state';
	import { formatNumber } from '$lib/utils.js';
	import { rewardState } from '$lib/state/reward.state';
	import { base } from '$app/paths';
	import { handleTutorialStep } from '$lib/tutorial.service';
	import { TutorialSteps } from '../../../common/enums';
	import { userBalanceBeforeRewardState } from '$lib/state/oldUserBalance.state';
	import { playerState } from '$lib/state/player.state';
	import MainButton from '$lib/components/common/MainButton.svelte';

	let ready = false;
	export let mission: Mission;
	export let index: number;

	$: isTutorialMission =
		mission.id === 'mgTutorialMission' ||
		mission.id === 'mgTutorialPb' ||
		mission.id === 'mgTutorialOffer';
	onMount(() => (ready = true));

	$: if ($missionClaimState.success) {
		mission.status =
			$missionClaimState.missionId === mission?.id ? MissionStatus.completed : mission?.status;
	}

	const missionDataByStatus = {
		[MissionStatus.completed]: {
			buttonText: mission?.ctaCaptionClaim,
			progressStatus: 'Done',
			cardStyle: `background-color: #202229; border: 2px solid #30333B;`,
			filter: '',
			color: 'yellow'
		},
		[MissionStatus.started]: {
			buttonText: mission?.ctaCaptionActive,
			progressStatus: `${mission?.progress}/${mission?.progressMax}`,
			cardStyle: 'background-color: rgba(14, 15, 18, 1); border: 2px solid rgba(30, 32, 37, 1);',
			filter: '',
			color: 'green'
		},
		[MissionStatus.claimed]: {
			buttonText: mission?.ctaCaptionClaimed,
			progressStatus: 'Done',
			cardStyle: 'display: none;',
			filter: 'filter: brightness(0.8);',
			color: 'gray'
		},
		[MissionStatus.inactive]: {
			buttonText: mission?.ctaCaptionInactive,
			progressStatus: 'Sorry',
			cardStyle: 'background-color: rgba(14, 15, 18, 1); border: 2px solid rgba(30, 32, 37, 1); z-index: 8;',
			filter: 'filter: brightness(0.2);',
			color: 'gray'
		}
	};

	const ctaHandler = {
		[MissionStatus.completed]: () => {
			//#tutorial
			if (mission.id === 'mgTutorialMission') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: { type: 'clickTutorDmS3ClaimButton' }
				});
				handleTutorialStep(TutorialSteps.dmStep4);
			} else {
				$userBalanceBeforeRewardState = $playerState.general.balance;
				$missionClaimState.isLoading = true;
				$rewardState.entityId = mission.id;
				AdapterCommunicationService.sendMessage({
					type: 'missionClaim',
					message: { missionId: mission?.id }
				});
			}
		},
		[MissionStatus.started]: () => {
			if (mission.id === 'mgTutorialPb') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: { type: 'goToTutorialMissionPb' }
				});
			} else if (mission.id === 'mgTutorialOffer') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: { type: 'goToTutorialMissionStore' }
				});
			} else {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: { type: 'clickGoToMission', entityId: mission.id }
				});
			}
			AdapterCommunicationService.sendMessage({
				type: 'redirect',
				message: mission?.ctaUrl
					? mission.ctaUrl.includes('game')
						? `${mission?.ctaUrl}?mission=${mission?.id}`
						: mission?.ctaUrl
					: ''
			});
		}
	};

	const openInfoPopUp = () => {
		if (
			mission.id !== 'mgTutorialMission' &&
			mission.id !== 'mgTutorialPb' &&
			mission.id !== 'mgTutorialOffer'
		) {
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: { type: 'clickInfoMission', entityId: mission.id }
			});
			$showPopUpLayout.isOpen = true;
			$showPopUpLayout.name = mission?.name;
			if (mission.status === MissionStatus.inactive) {
				$showPopUpLayout.additionalText = 'Unlock description';
				$showPopUpLayout.description = mission?.unlockDesc;
			} else {
				$showPopUpLayout.description = mission?.longDesc;
			}
			AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
		}
	};

	const handleCta = () => {
		AdapterCommunicationService.sendMessage({ type: 'openPopup', message: 'click' });
		ctaHandler[mission?.status]();
	};

</script>

<div
	id={mission.id}
	style={missionDataByStatus[mission?.status]?.cardStyle}
	class=" w-full rounded-[12px] h-[108px]
        {mission?.status !== MissionStatus.claimed && mission?.status !== MissionStatus.inactive
		? 'pulse-ping-animation'
		: ''}
        {mission?.status === MissionStatus.completed && ready ? 'updated-yellow-border' : ''}
        {(mission.id === 'mgTutorialPb' || mission.id === 'mgTutorialOffer') &&
	mission.status !== MissionStatus.inactive &&
	ready &&
	!$rewardState.isOpen
		? 'updated-yellow-border'
		: ''} relative shade-mission overflow-hidden"
>
	<div
		style="border-radius: 0px 0px 11px 11px;"
		class="absolute left-0 bottom-0 w-full h-[44px] bg-[rgba(0,_0,_0,_0.4)]"
	></div>
	<div
		style={missionDataByStatus[mission?.status]?.filter + ``}
		class="absolute flex h-full w-full justify-center items-center"
	>
		<div class="h-full w-full flex justify-center items-center z-[4]">
			<RenderMissionImg
				image={mission?.iconUrl}
				on:click={() => openInfoPopUp()}
				{isTutorialMission}
			/>
			<AboutMissionText
				name={mission?.name}
				description={mission?.shortDesc}
				status={`${formatNumber(mission?.progress)}/${formatNumber(mission?.progressMax)}`}
				progress={(mission?.progress / mission?.progressMax) * 100}
			/>
			{#key mission?.status}
				<MissionStatusBlock
					money={mission.rewards}
					IcnCoin={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}
				>
					<div
						id={mission.id === 'mgTutorialMission' ? 'missionClaimButton' : undefined}
						slot="svg"
						class="flex w-[84px] h-[30px] justify-center items-center text-[#e8e8e8] text-xs font-semibold font-['Poppins'] uppercase rounded-lg  "
					>
						<MainButton
							on:click={() => handleCta()}
							isLoading={$missionClaimState.isLoading}
							caption={missionDataByStatus[mission?.status].buttonText || '???'}
							textStyles=" color: #e8e8e8; font-size: 12px; font-weight: 600; "
							wrapBtnStyles="width: 84px; height: 30px; border-radius: 8px; "
							variant="default"
						/>
					</div>
				</MissionStatusBlock>
			{/key}
		</div>
	</div>
</div>

<style lang="scss">
</style>
