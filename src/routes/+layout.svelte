<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { loadTranslations } from '$lib/i18n/config';
	import { page } from '$app/stores';
	import { Lang, StoreOfferType, TutorialSteps } from '../common/enums';
	import { AdapterCommunicationService } from '$lib/adapter-listener';
	import type { PlayerDataType } from '../common/models/player-data.type';
	import { playerState } from '$lib/state/player.state';
	import { syncWithPlayerPbState } from '$lib/state/pb.state';
	import { rewardState } from '$lib/state/reward.state';
	import { MissionStatus } from '../common/models/mission.type';
	import { missionClaimState } from '$lib/state/missionClaim.state';
	import { showPopUpLayout } from '$lib/state/popup.state';
	import { initialPopUpLayoutState } from '$lib/state/popup.state.js';
	import type { PopUpState } from '../types/popup.type';
	import { showPopUpStoreLayout } from '$lib/state/storePopup.state';
	import { StorePopUpMode } from '../types/storePopup.type';
	import type { StoreOfferClaimResponse } from '../common/models/store-offer.type';
	import Popup from '$lib/components/common/Popup.svelte';
	import { enrichTutorialMissions, handleTutorialStep } from '$lib/tutorial.service';
	import { tutorialState } from '$lib/state/tutorial.state';
	import { get } from 'svelte/store';
	// import {browser} from '$app/environment';
	// import Tracker from '@openreplay/tracker'

	onMount(async () => {
		let userId = $page.url.searchParams.get('userId');
		let currentLang = $page.url.searchParams.get('lang') as Lang;
		let isFormWidget = $page.url.searchParams.get('fromWidget');
		await loadTranslations(Lang[currentLang || 'en'] || 'en');

		document.addEventListener('DOMContentLoaded', () => {
			AdapterCommunicationService.sendMessage({
				type: 'ImageLoaded'
			});
		});

		// open replay
		// try {
		//     if (browser) {
		//         const tracker = new Tracker({
		//             projectKey: import.meta.env.VITE_OR_KEY,
		//             ingestPoint: import.meta.env.VITE_OR_ENDPOINT,
		//             crossdomain: {
		//                 parentDomain: '*'
		//             }
		//         });
		//
		//         await tracker.start({userID: userId + '-iframe' ?? ''});
		//     }
		// } catch (e) {
		//     console.error(e);
		// }

		//#tutorial
		let loadMissionsForTutorial = () => {
			if (!$playerState.mg && $playerState.tutorial) {
				const tommorow = new Date();
				tommorow.setDate(tommorow.getDate() + 1);
				$playerState.mg = {
					id: 'tutorialMg',
					info: 'Daily Mission',
					missions: [],
					dateEnd: tommorow,
					name: 'Daily Mission'
				};
			}
			if (!$playerState.store && $playerState.tutorial) {
				$playerState.store = {
					info: '',
					terms: '',
					offers: []
				};
			}
			if ($playerState.tutorial && $playerState.tutorial.step === 1) {
				$tutorialState.missions = $playerState?.mg?.missions.length ? $playerState.mg.missions : [];
				$playerState.mg.missions = enrichTutorialMissions(
					$playerState.mg.missions,
					$playerState.tutorial,
					'mission',
					false,
					$playerState.tutorial.step
				);
			} else if ($playerState.tutorial && $playerState.tutorial.step === 2) {
				$playerState.pb = {
					id: 'tutorialPb',
					reward: ($playerState.tutorial.tutorialMissionReward || 0) * 2,
					name: 'Mr Piggy',
					ctaCaptionClaim: 'Claim',
					ctaCaptionHold: 'Hold',
					info: '',
					isClaimed: false,
					balance: 0,
					balanceMax: $playerState.tutorial.tutorialMissionReward || 0,
					dateEnd: new Date(),
					finalMultiplierPercents: 100,
					finalMultiplierReward: ($playerState.tutorial.tutorialMissionReward || 0) * 2,
					intermediateMultiplierPercents: 50,
					intermediateMultiplierReward: $playerState.tutorial.tutorialMissionReward / 2,
					intermediateThreshold: 50
				};
				$playerState.mg.missions = enrichTutorialMissions(
					$playerState.mg.missions,
					$playerState.tutorial,
					'piggyBank',
					true,
					$playerState.tutorial.step
				);
			} else if ($playerState.tutorial && $playerState.tutorial.step === 3) {
				const tutorialOffer = $playerState.store?.offers?.find((el) => el?.id === 'tutorialOffer');
				if (!tutorialOffer) {
					$playerState.store = {
						...$playerState.store,
						offers: [
							{
								id: 'tutorialOffer',
								name: $playerState.tutorial.tutorStoreCardTitle || 'Free spins',
								reward: 'x2',
								type: StoreOfferType.freeSpins,
								description: $playerState.tutorial.storeS1ModalDescription || '',
								endDate: undefined,
								price: $playerState.tutorial.tutorialMissionReward * 2 || 0,
								reusable: false
							},
							...get(playerState).store.offers
						]
					};
				}
				$playerState.mg.missions = enrichTutorialMissions(
					$playerState.mg.missions,
					$playerState.tutorial,
					'store',
					true,
					$playerState.tutorial.step
				);
			}
		};

		AdapterCommunicationService.subscribeOnInitUpdates(
			(data: PlayerDataType) => {
				if (data) {
					AdapterCommunicationService.sendMessage({ type: 'track' });
					$playerState = {
						isInitialized: true,
						mg: data.mg,
						pb: data.pb,
						store: data.store,
						general: data.general,
						isLiveReload: data.isLiveReload ?? false,
						tutorial: data.tutorial ? data.tutorial : undefined
					};

					//#tutorial
					loadMissionsForTutorial();

					AdapterCommunicationService.sendMessage({
						type: 'appReady'
					});
				}
			},
			(pbHoldResponse) => {
				wrapAdapterResponse(pbHoldResponse?.result, () => {
					$playerState.pb.balance = pbHoldResponse.pb.balance;
					$playerState.general.balance = pbHoldResponse.general.balance;
					$playerState.general.pbRed = pbHoldResponse.pb.balance === pbHoldResponse.pb.balanceMax;

					syncWithPlayerPbState($playerState);
				});
			},
			(pbClaimResponse) => {
				wrapAdapterResponse(pbClaimResponse?.result, () => {
					$playerState.pb.reward = pbClaimResponse.pb.reward;
					$playerState.general.balance = pbClaimResponse.general.balance;

					$rewardState.amount = pbClaimResponse.pb.reward;
					$rewardState.isOpen = true;

					syncWithPlayerPbState($playerState);
				});
			},
			(missionProgressResponse) => {
				wrapAdapterResponse(missionProgressResponse?.result, () => {
					$playerState.mg.missions.find(
						(x) => x.id === missionProgressResponse.missionId
					).progress = missionProgressResponse.progress;
					$playerState.mg.missions.find((x) => x.id === missionProgressResponse.missionId).status =
						missionProgressResponse.status;
					$playerState.general.dmRed = missionProgressResponse.status === MissionStatus.completed;
				});
			},
			(missionClaimResponse) => {
				wrapAdapterResponse(missionClaimResponse?.result, () => {
					$playerState.mg.missions = missionClaimResponse.missions;
					//#tutorial
					loadMissionsForTutorial();
					$playerState.general.balance = missionClaimResponse.general.balance;
					$playerState.general.dmRed = $playerState.mg.missions.some(
						(m) => m.status === 'completed'
					);
					$rewardState.amount = missionClaimResponse.mission.reward;
					$rewardState.isOpen = true;
					$missionClaimState.isLoading = false;
					$missionClaimState.success = true;
				});
			},
			(offerClaimResponse: StoreOfferClaimResponse) => {
				wrapAdapterResponse(
					offerClaimResponse.result,
					() => {
						if (
							!$playerState.store.offers.find((x) => x.id === offerClaimResponse.store.offerId)
								?.reusable
						) {
							$playerState.store.offers = $playerState.store.offers.filter(
								(x) => x.id !== offerClaimResponse.store.offerId
							);
						}
						$playerState.general.balance = offerClaimResponse.general.balance;

						$showPopUpStoreLayout.isLoading = false;
						$showPopUpStoreLayout.purchaseSuccessful = true;
						$showPopUpStoreLayout.mode = StorePopUpMode.claim;
					},
					() => {
						$showPopUpStoreLayout.isLoading = false;
						$showPopUpStoreLayout.purchaseSuccessful = false;
						$showPopUpStoreLayout.isOpen = false;
					}
				);
			},
			(step: TutorialSteps) => {
				handleTutorialStep(step);
			}
		);

		AdapterCommunicationService.sendMessage({
			type: 'appLoaded',
			message: { fromWidget: isFormWidget }
		});
	});

	const wrapAdapterResponse = (
		result: {
			success: boolean;
			message: string;
		},
		onSuccess: () => void,
		onFailure: () => void = null
	) => {
		if (!result.success) {
			if (onFailure) onFailure();

			handleApiFailure(result.message);
		} else {
			onSuccess();
		}

		return result.success;
	};

	const handleApiFailure = (message: string) => {
		showPopUpLayout.set({
			name: 'Error',
			isOpen: true,
			description: message,
			additionalText: '',
			globalExit: true
		} as PopUpState);
	};

	const closePopup = () => {
		if ($showPopUpLayout.globalExit) {
			AdapterCommunicationService.sendMessage({ type: 'exit', message: 'click' });
		}
		$showPopUpLayout = { ...initialPopUpLayoutState };
		AdapterCommunicationService.sendMessage({ type: 'hidePopup', message: 'click' });
	};
</script>

<Popup {$showPopUpLayout} on:close={closePopup} />

<slot />
