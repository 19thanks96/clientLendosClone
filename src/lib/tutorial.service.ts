import {StoreOfferType, TutorialSteps} from "../common/enums";
import {type Mission, MissionStatus, MissionType} from "../common/models/mission.type";
import {type TutorialType} from "../common/models/tutorial.type";
import {addBackgroundGlass, deselectItemsOnPage, removeBackgroundGlass, selectItemsOnPage} from "$lib/tutorial.utils";
import {AdapterCommunicationService} from "$lib/adapter-listener";
import {playerState} from "$lib/state/player.state";
import {get} from "svelte/store";
import {rewardState} from "$lib/state/reward.state";
import {userBalanceBeforeRewardState} from "$lib/state/oldUserBalance.state";
import {tick} from "svelte";


export const enrichTutorialMissions = (missions: Mission[], tutorial: TutorialType | undefined, type: 'mission' | 'store' | 'piggyBank', isInitial = false, step = 0): Mission[] => {
    const initialTutorialMission: Mission = {
        id: 'mgTutorialMission',
        status: MissionStatus.started,
        iconUrl: 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/tutorial/Img_Dm_IconComlete.png',
        rewards: tutorial?.tutorialMissionReward || 0,
        unlockDesc: '',
        missionType: MissionType.betsCount,
        ctaCaptionActive: tutorial?.tutorDmCtaStarted || '',
        ctaCaptionClaim: tutorial?.tutorDmCtaCompleted || '',
        ctaCaptionClaimed: '',
        ctaCaptionInactive: tutorial?.tutorDmCtaInactive || '',
        ctaUrl: 'url',
        name: tutorial?.tutorDmTitle || '',
        longDesc: '',
        progress: step < 2 ? 0 : 1,
        progressMax: '1',
        shortDesc: tutorial?.tutorDmDesc || ''
    }

    const initialPbMission: Mission = {
        id: 'mgTutorialPb',
        status: MissionStatus.started,
        iconUrl: 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/tutorial/Img_Dm_IconPiggy.png',
        rewards: tutorial?.tutorialMissionReward || 0,
        unlockDesc: '',
        missionType: MissionType.betsCount,
        ctaCaptionActive: tutorial?.tutorPbCtaStarted || '',
        ctaCaptionClaim: '',
        hiddenBeforeTutorial: false,
        ctaCaptionClaimed: '',
        ctaCaptionInactive: tutorial?.tutorPbCtaInactive || '',
        ctaUrl: 'p2w://pb',
        name: tutorial?.tutorPbTitle || '',
        longDesc: '',
        progress: step < 3 ? 0 : 1,
        progressMax: '1',
        shortDesc: tutorial?.tutorPbDesc || ''
    }

    const initialStoreMission: Mission = {
        id: 'mgTutorialOffer',
        status: MissionStatus.started,
        iconUrl: 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/client/tutorial/Img_Dm_IconStore.png',
        rewards: 0,
        unlockDesc: '',
        missionType: MissionType.betsCount,
        hiddenBeforeTutorial: false,
        ctaCaptionActive: tutorial?.tutorStoreCtaStarted || '',
        ctaCaptionClaim: '',
        ctaCaptionClaimed: '',
        ctaCaptionInactive: tutorial?.tutorStoreCtaInactive || '',
        ctaUrl: 'p2w://store',
        name: tutorial?.tutorStoreTitle || '',
        longDesc: '',
        progress: step < 4 ? 0 : 1,
        progressMax: '1',
        shortDesc: tutorial?.tutorStoreDesc || ''
    }

    switch (type) {
        case "mission": {
            const filteredMissions = missions.filter((m) => !m.hiddenBeforeTutorial)
            return [initialTutorialMission, ...filteredMissions]
        }
        case 'piggyBank': {
            const filteredMissions = missions.filter((m) => !m.hiddenBeforeTutorial)
            let tutorialMissions = [initialPbMission, ...filteredMissions]
            if (isInitial) {
                tutorialMissions = [...tutorialMissions, {
                    ...initialTutorialMission,
                    status: MissionStatus.inactive
                }]
            }
            return tutorialMissions
        }
        case 'store': {
            const filteredMissions = missions.filter((m) => !m.hiddenBeforeTutorial)
            let tutorialMissions = [initialStoreMission, ...filteredMissions]
            if (isInitial) {
                tutorialMissions = [
                    ...tutorialMissions,
                    {
                        ...initialTutorialMission,
                        status: MissionStatus.inactive
                    },
                    {
                        ...initialPbMission,
                        status: MissionStatus.inactive
                    }
                ]
            }
            return tutorialMissions;
        }
    }
}


export const handleTutorialStep = async (step: TutorialSteps) => {
    switch (step) {
        case TutorialSteps.dmStep1: {
            const tutorial = get(playerState).tutorial ? {
                ...get(playerState).tutorial,
                step: 1
            } as TutorialType : undefined;
            playerState.set({
                ...get(playerState),
                tutorial
            });
            await tick();
            addBackgroundGlass(0);
            const missionClaimButton = document.getElementById('missionClaimButton');
            if (missionClaimButton) {
                const coordinates = missionClaimButton.getBoundingClientRect();
                AdapterCommunicationService.sendMessage({
                    type: 'setTutorialCoordinates', message: {
                        element: 'dmClaimButton',
                        coordinates: {
                            x: coordinates.x,
                            y: coordinates.y,
                            width: coordinates?.width || 0,
                            height: coordinates?.height || 0
                        }
                    }
                })
            }
            const dmScrollBlock = document.getElementById('scrollBlockDm');
            if (dmScrollBlock) {
                dmScrollBlock.style.overflowY = 'hidden';
            }
            break;
        }
        case TutorialSteps.dmStep2: {
            removeBackgroundGlass();
            addBackgroundGlass(3);
            selectItemsOnPage(['dmTimer']);
            break;
        }
        case TutorialSteps.dmStep3: {
            const playerStateCopy = get(playerState);
            const updatedMissions = playerStateCopy.mg.missions.map((mission) =>
                mission.id === 'mgTutorialMission'
                    ? {...mission, status: MissionStatus.completed, progress: 1}
                    : mission
            );
            await playerState.set(
                {
                    ...playerStateCopy,
                    mg: {
                        ...playerStateCopy.mg,
                        missions: updatedMissions
                    }
                }
            );
            await tick();
            deselectItemsOnPage(['dmTimer'])
            selectItemsOnPage(['mgTutorialMission']);
            break;
        }
        case TutorialSteps.dmStep4: {
            const dmScrollBlock = document.getElementById('scrollBlockDm');
            if (dmScrollBlock) {
                dmScrollBlock.style.overflowY = 'scroll';
            }
            const tutorial = get(playerState).tutorial as TutorialType;
            deselectItemsOnPage(['mgTutorialMission']);
            removeBackgroundGlass();
            userBalanceBeforeRewardState.set(get(playerState).general.balance)
            rewardState.set({
                    amount: tutorial.tutorialMissionReward,
                    isOpen: true,
                    entityId: ''
                }
            )
            AdapterCommunicationService.sendMessage({
                type: 'hideTutorialHints',
            });
            await tick();

            const claimRewardDmButton = document.getElementById('claimRewardDmButton');
            const coordinates = claimRewardDmButton?.getBoundingClientRect();
            setTimeout(() => {
                AdapterCommunicationService.sendMessage({
                    type: 'setTutorialCoordinates', message: {
                        element: 'claimRewardDmButton',
                        coordinates: {
                            x: coordinates?.x || 0,
                            y: coordinates?.y || 0,
                            width: coordinates?.width || 0,
                            height: coordinates?.height || 0
                        }
                    }
                })
            }, 1000)

            break;

        }
        case TutorialSteps.initPb: {
            const tutorial = get(playerState).tutorial as TutorialType;
            if (tutorial) {
                const tutorialMissionReward = tutorial.tutorialMissionReward;
                addBackgroundGlass(0);
                playerState.set({
                    ...get(playerState),
                    pb: {
                        id: 'tutorialPb',
                        reward: (tutorialMissionReward || 0) * 2,
                        name: 'Mr Piggy',
                        ctaCaptionClaim: 'Claim',
                        ctaCaptionHold: 'Hold',
                        info: '',
                        isClaimed: false,
                        balance: 0,
                        balanceMax: tutorialMissionReward || 0,
                        dateEnd: new Date(),
                        finalMultiplierPercents: 100,
                        finalMultiplierReward: (tutorialMissionReward || 0) * 2,
                        intermediateMultiplierPercents: 50,
                        intermediateMultiplierReward: tutorialMissionReward / 2,
                        intermediateThreshold: 50
                    }
                });
            }
            break;
        }
        case TutorialSteps.pbStep1: {
            const increasePbButton = document.getElementById('increasePbButton');
            const coordinates = increasePbButton?.getBoundingClientRect();
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'increasePbButton',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            })
            break;
        }
        case TutorialSteps.pbStep2: {
            removeBackgroundGlass();
            addBackgroundGlass(1);
            selectItemsOnPage(['pbBetControls'])
            break;
        }
        case TutorialSteps.pbStep3: {
            selectItemsOnPage(['pbHoldButton'])
            break;
        }
        case TutorialSteps.pbStep4: {
            selectItemsOnPage(['pbClaimButton'])
            break;
        }
        case TutorialSteps.pbStep5: {
            deselectItemsOnPage(['pbHoldButton', 'pbClaimButton', 'pbBetControls']);
            removeBackgroundGlass();
            const tutorial = get(playerState).tutorial as TutorialType;
            rewardState.set({
                    amount: tutorial.tutorialMissionReward * 2,
                    isOpen: true,
                    entityId: ''
                }
            )
            userBalanceBeforeRewardState.set(get(playerState).general.balance);
            await tick();
            const claimRewardPbButton = document.getElementById('claimRewardPbButton');
            const coordinates = claimRewardPbButton?.getBoundingClientRect();
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'claimRewardPbButton',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            });
            break;
        }
        case TutorialSteps.offerStep1: {
            addBackgroundGlass(3);
            const tutorial = get(playerState).tutorial as TutorialType;
            const offers = get(playerState).store.offers
            const isExistTutorMission = offers.some(item => item?.id === "tutorialOffer");
            if (tutorial && !isExistTutorMission ) {
                playerState.set({
                    ...get(playerState),
                    store: {
                        ...get(playerState).store,
                        offers: [
                            {
                                id: 'tutorialOffer',
                                name: tutorial.tutorStoreCardTitle || 'Free spins',
                                reward: 'x2',
                                type: StoreOfferType.freeSpins,
                                description: tutorial.storeS1ModalDescription || '',
                                endDate: undefined,
                                price: tutorial.tutorialMissionReward * 2 || 0,
                                reusable: false,
                            },
                            ...get(playerState).store.offers
                        ]
                    }
                });
            }
            await tick();
            const offerElement = document.getElementById('tutorialOffer');
            const coordinates = offerElement?.getBoundingClientRect();
            selectItemsOnPage(['tutorialOffer'])
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'offerElement',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            });
            break;
        }
        case TutorialSteps.offerStep2: {
            deselectItemsOnPage(['tutorialOffer'])
            await tick();
            const sorePopUpBuyButton = document.getElementById('sorePopUpBuyButton');
            const coordinates = sorePopUpBuyButton?.getBoundingClientRect();
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'sorePopUpBuyButton',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            });
            break;
        }
        case TutorialSteps.offerStep3: {
            await tick();
            const sorePopUpClaimButton = document.getElementById('sorePopUpClaimButton');
            const coordinates = sorePopUpClaimButton?.getBoundingClientRect();
            AdapterCommunicationService.sendMessage({
                type: 'setTutorialCoordinates', message: {
                    element: 'sorePopUpClaimButton',
                    coordinates: {
                        x: coordinates?.x || 0,
                        y: coordinates?.y || 0,
                        width: coordinates?.width || 0,
                        height: coordinates?.height || 0
                    }
                }
            });
            break;
        }

    }
}