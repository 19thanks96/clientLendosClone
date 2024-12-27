import type {AdapterMessage} from "$lib/utils";
import type {MissionClaimTypeDto, MissionProgressTypeDto} from "../common/models/mission.type";
import type {StoreOfferClaimResponse} from "../common/models/store-offer.type";
import {TutorialSteps} from "../common/enums";

const subscribeOnInitUpdates = (initialDataHandler: (data: unknown) => void,
                                pbHoldResponseHandler: (pbHoldResponse: unknown) => void,
                                pbClaimResponseHandler: (pbHoldResponse: unknown) => void,
                                missionProgressHandler: (missionProgress: MissionProgressTypeDto) => void,
                                missionClaimHandler: (missionClaim: MissionClaimTypeDto) => void,
                                offerClaimHandler: (offerClaim: StoreOfferClaimResponse) => void,
                                handleTutorialStep: (step: TutorialSteps) => void,
) => {
    window.addEventListener("message", (e) => {
        const data = e.data;


        try {
            const {type, message} = data;
            
            if (type === 'newData') {
                initialDataHandler(message);
            } else if (type === 'pbHoldResponse') {
                pbHoldResponseHandler(message);
            } else if (type === 'pbClaimResponse') {
                pbClaimResponseHandler(message);
            } else if (type === 'missionProgress') {
                missionProgressHandler(message);
            } else if (type === 'missionClaim') {
                missionClaimHandler(message);
            } else if (type === 'offerClaim') {
                offerClaimHandler(message);
            } else if (type === 'tutorial') {
                handleTutorialStep(message)
            }else {
                console.log('unknown message ::: ', data);
            }
        } catch (e) {
            console.log('something went wrong on client\'s message')//, JSON.stringify(e))
        }
    });
}

const subscribeOnPiggyUpdates = (handler: (data: unknown) => void) => {
    window.addEventListener("message", (e) => {
        const data = e.data;

        try {
            const {type} = data;

            if (type === 'pbHoldResponse' || type === 'pbClaimResponse') {
                handler(data);
            } else {
                // console.log('unknown message ::: ', data);
            }
        } catch (e) {
            console.log('something went wrong on client\'s message ')//, JSON.stringify(e))
        }
    });
}

export const sendMessage = (payload: AdapterMessage): void => {
    const parentWindow = window?.parent;

    if (!parentWindow) throw new Error('app is not in a natural habitat')

    parentWindow.postMessage(payload, "*");
}

export const AdapterCommunicationService = {
    subscribeOnInitUpdates,
    subscribeOnPiggyUpdates,
    sendMessage
}
