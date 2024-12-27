<script lang="ts">
	import {type Mission, MissionStatus} from '../../../common/models/mission.type';
	import AboutMissionText from './AboutMissionText.svelte';
	import RenderMissionImg from './RenderMissionImg.svelte';
	import MissionStatusBlock from './MissionStatusBlock.svelte';
	import AppButton from '$lib/components/common/AppButton.svelte';
	import {showPopUpLayout} from '$lib/state/popup.state';
	import {onMount} from 'svelte';
	import {AdapterCommunicationService} from '$lib/adapter-listener';
	import {missionClaimState} from '$lib/state/missionClaim.state';
	import {formatNumber} from '$lib/utils.js';
	import {rewardState} from '$lib/state/reward.state';
	import {base} from '$app/paths';
	import {handleTutorialStep} from "$lib/tutorial.service";
	import {TutorialSteps} from "../../../common/enums";
	import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
	import {playerState} from "$lib/state/player.state";

	let ready = false;
	export let mission: Mission;
	export let index: number;

	$:isTutorialMission =
		mission.id === 'mgTutorialMission' ||
		mission.id === 'mgTutorialPb' ||
		mission.id === 'mgTutorialOffer'
	onMount(() => ready = true);

	$: if ($missionClaimState.success) {
		mission.status = $missionClaimState.missionId === mission?.id ? MissionStatus.completed : mission?.status;
	}

	const missionDataByStatus = {
		[MissionStatus.completed]: {
			buttonText: mission?.ctaCaptionClaim,
			progressStatus: 'Done',
			cardStyle: `border-image-source: url(https://p2w.imgix.net/resources/client/dm/Cmt_Dm_Bg_PopUp_List_Done.svg?auto=compress&auto=format); `,
			filter: '',
			color: 'yellow'
		},
		[MissionStatus.started]: {
			buttonText: mission?.ctaCaptionActive,
			progressStatus: `${mission?.progress}/${mission?.progressMax}`,
			cardStyle: '',
			filter: '',
			color: 'green'
		},
		[MissionStatus.claimed]: {
			buttonText: mission?.ctaCaptionClaimed,
			progressStatus: 'Done',
			cardStyle: '',
			filter: 'filter: brightness(0.8);',
			color: 'gray'
		},
		[MissionStatus.inactive]: {
			buttonText: mission?.ctaCaptionInactive,
			progressStatus: 'Sorry',
			cardStyle: 'display:none',
			filter: 'filter: brightness(0.8);',
			color: 'gray'
		}
	};


	let shadeNumbers = '-webkit-text-stroke-color: black; -webkit-text-stroke-width: thin;  box-shadow: (0.1vw 0.1vw #333);';

	const ctaHandler = {
		[MissionStatus.completed]: () => {
			//#tutorial
			if (mission.id === 'mgTutorialMission') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: {type: 'clickTutorDmS3ClaimButton'}
				});
				handleTutorialStep(TutorialSteps.dmStep4);

			} else {
				$userBalanceBeforeRewardState = $playerState.general.balance;
				$missionClaimState.isLoading = true;
				$rewardState.entityId = mission.id;
				AdapterCommunicationService.sendMessage({type: 'missionClaim', message: {missionId: mission?.id}});
			}
		},
		[MissionStatus.started]: () => {
			if (mission.id === 'mgTutorialPb') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: {type: 'goToTutorialMissionPb'}
				});
			} else if (mission.id === 'mgTutorialOffer') {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: {type: 'goToTutorialMissionStore'}
				});
			} else {
				AdapterCommunicationService.sendMessage({
					type: 'track',
					message: {type: 'clickGoToMission', entityId: mission.id}
				});
			}
			AdapterCommunicationService.sendMessage({type: 'redirect', message: mission?.ctaUrl ?? ''});
		}
	};

	const openInfoPopUp = () => {
		if (mission.id !== 'mgTutorialMission' && mission.id !== 'mgTutorialPb' && mission.id !== 'mgTutorialOffer') {
			AdapterCommunicationService.sendMessage({
				type: 'track',
				message: {type: 'clickInfoMission', entityId: mission.id}
			});
			$showPopUpLayout.isOpen = true;
			$showPopUpLayout.name = mission?.name;
			if (mission.status === MissionStatus.inactive) {
				$showPopUpLayout.additionalText = 'Unlock description';
				$showPopUpLayout.description = mission?.unlockDesc;
			} else {
				$showPopUpLayout.description = mission?.longDesc;
			}
			AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
		}
	};

	const handleCta = () => {
		AdapterCommunicationService.sendMessage({type: 'openPopup', message: 'click'});
		ctaHandler[mission?.status]();
	};
	const requiresAttentionSeeker  = mission.status === MissionStatus.completed  || isTutorialMission && $playerState?.tutorial?.step > 1 ;

</script>


<div id={mission.id}
		 class=" w-full port:h-[16.4vw] rounded-[0.6vw] port:rounded-[0.1vw] vwHeight-[84.61]
        { mission?.status !== MissionStatus.claimed && mission?.status !== MissionStatus.inactive ? 'pulse-ping-animation' : '' }
        { (mission?.status === MissionStatus.completed)  && ready ? 'updated-yellow-border' : ''}
        { (mission.id === 'mgTutorialPb' || mission.id === 'mgTutorialOffer') && mission.status !== MissionStatus.inactive && ready && !$rewardState.isOpen   ? 'updated-yellow-border' : '' } relative shade-mission overflow-hidden">
	<div style="{missionDataByStatus[mission?.status]?.cardStyle}
    {isTutorialMission && mission?.status !== MissionStatus.claimed && mission?.status !== MissionStatus.inactive ? `border-image-source: url(${base}/newImg/Cmt_Dm_Bg_PopUp_List_Done.svg); ` : '' }"
			 class="absolute h-full w-full flex justify-center items-center mission-border z-[3] ">
	</div>
	<div
		style={missionDataByStatus[mission?.status]?.filter + `background: linear-gradient(180deg, #FCFCF2 0%, #FFF8E4 100%); box-shadow: inset 0 0 12px 4px  rgba(108, 63, 53, 0.15);` }
		class="absolute  port:h-[16.4vw]  vwHeight-[84.61] flex  gap-x-[0.1vw] md:gap-x-[0.2vw] h-full w-full  justify-center items-center mission-border-image">
		<div class="h-full w-full flex justify-center items-center p-[0.619vw] port:p-[1.95vw]  z-[4]">
			<RenderMissionImg image={mission?.iconUrl} on:click={() => openInfoPopUp() } {isTutorialMission} />
			<AboutMissionText name={mission?.name} description={mission?.shortDesc}
												status={`${ formatNumber(mission?.progress)}/${ formatNumber(mission?.progressMax)}`}
												progress={(mission?.progress/mission?.progressMax)*100}
			/>
			{#key mission?.status}
				<MissionStatusBlock
					money={mission.rewards}
					IcnCoin={`https://p2w.imgix.net/resources/client/common/Icn_Coin.png?auto=compress&auto=format`}
				>
					<div id={mission.id === 'mgTutorialMission' ? 'missionClaimButton' : undefined}
							 slot="svg"
							 class="w-full h-full flex justify-center items-center ">
						<AppButton
							{index}
							{requiresAttentionSeeker}
							on:click={() => handleCta() }
							isLoading={$missionClaimState.isLoading}
							caption={missionDataByStatus[mission?.status].buttonText}
							color={missionDataByStatus[mission?.status].color}
							isActive={mission?.status === MissionStatus.completed ||  mission?.status === MissionStatus.started} />
					</div>
				</MissionStatusBlock>
			{/key}
		</div>
	</div>
</div>


<style lang="scss">
  #mgTutorialOffer.pulse-ping-animation,
  #mgTutorialPb.pulse-ping-animation {
    animation: pulseBtn 1s linear infinite;
    -webkit-animation: pulseBtn 1s linear infinite;
    -moz-animation: pulseBtn 1s linear infinite;
  }

  @keyframes pulseBtn {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(255, 215, 0);
      box-shadow: 0 0 0 0 rgba(255, 215, 0);
    }
    70% {
      -moz-box-shadow: 0 0 10px 20px rgba(252, 71, 71, 0);
      box-shadow: 0 0 10px 20px rgba(252, 71, 71, 0);
    }
    100% {
      -moz-box-shadow: 0 0 0 0 rgba(235, 100, 160, 0);
      box-shadow: 0 0 0 0 rgba(235, 100, 160, 0);
    }
  }

  .shade-mission {
    box-shadow: (0 6px 5px rgba(119, 94, 59, 50%));
    border-radius: 0.781vw;
  }

  .shade-mission:last-of-type {
    box-shadow: (0 0 0 rgba(119, 94, 59, 50%));

  }

  .mission-border {
    border-image-slice: 90 fill;
    border-image-width: 2vw;
    border-image-outset: 0vw;
    border-image-repeat: stretch stretch;
  }

  .mission-border-image {
    border-image-slice: 50 fill;
    border-image-width: 1.1vw;
    border-image-outset: 0vw;
    border-image-repeat: stretch stretch;
  }

  @media (orientation: portrait) {
    .shade-mission {
      border-radius: 3.06vw;
      filter: drop-shadow(0 0.469vw 0.4vw rgba(119, 94, 59, 50%));
    }
    .mission-border {
      border-image-slice: 82 fill;
      border-image-width: 6.5vw;
      border-image-outset: 0vw;
      border-image-repeat: stretch stretch;

    }

    .mission-border-image {
      border-image-slice: 82 fill;
      border-image-width: 6.5vw;
      border-image-outset: 0vw;
      border-image-repeat: stretch stretch;
    }
  }

  @keyframes slideIn {
    from {
      transform: translate(-500px, -200px) rotate(35deg);
    }
    to {
      transform: translate(calc(500px), -200px) rotate(35deg);
    }
  }


  .updated-yellow-border::before {
    background: linear-gradient(to right, #fdfcf200, #fdfcf2);
    content: "";
    position: absolute;
    width: 6vw;
    height: 500px;
    animation: slideIn 3s both;
    transform: translate(calc(1500px), -200px) rotate(35deg);
    will-change: transform;
    z-index: 4;
  }

  #mgTutorialOffer.updated-yellow-border::before,
  #mgTutorialPb.updated-yellow-border::before {
    animation: slideIn 3s infinite;
    will-change: transform;
  }
</style>