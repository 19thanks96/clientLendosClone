export type Mission = {
    id: string;
    name: string;
    shortDesc: string;
    longDesc: string;
    unlockDesc: string;
    status: MissionStatus;
    progress?: number;
    progressMax?: string;
    rewards: number;
    iconUrl: string;
    ctaUrl?: string;
    ctaCaptionInactive: string;
    ctaCaptionActive: string;
    ctaCaptionClaim: string;
    ctaCaptionClaimed: string;
    hiddenBeforeTutorial: boolean;
    widget?: {
        widgetInAllGames: boolean
        showInfoInSlot: boolean
        widgetGames: string[] | undefined
        minBet: number
        winMultiplier: number
        widgetInfoDescriptionMinBet: string
        widgetInfoDescriptionMultiplier: string
        widgetWarningMessageAttention: string
        widgetWarningMessageRequirement: string
    }
    missionType: MissionType
}

export enum MissionType {
    betsVolume = 'betsVolume',
    betsCount = 'betsCount',
    depositAmount = 'depositAmount',
    depositCount = 'depositCount',
    winsAmount = 'winsAmount',
    pbHold = 'pbHold',
    pbClaim = 'pbClaim',
    offerClaim = 'offerClaim',
    offerClaimCount = 'offerClaimCount',
}


export enum MissionStatus {
    inactive = 'inactive',
    started = 'started',
    completed = 'completed',
    claimed = 'claimed',
    unfinished = 'unfinished',
}

export type MissionProgressTypeDto = {
    missionId: string;
    progress: number;
    status: MissionStatus;
}


export type MissionClaimTypeDto = {
    mission: {
        id: string;
        reward: number;
        status: MissionStatus;
    },
    missions: Mission[]
    general: {
        balance: number;
    };
}
/*
mission: {
							id: enduserMissionEntity.mission.id,
							reward: enduserMissionEntity.mission.reward,
							status: 'claimed',
						},
						general: {
							balance: newEnduserBalance,
						},
						result: { success: true },
 */
