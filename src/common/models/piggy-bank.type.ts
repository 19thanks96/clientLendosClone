export type PiggyBankType = {
	id: string
	name: string
	balance: number
	reward: number
	balanceMax: number
	intermediateThreshold: number
	dateEnd: Date
	isClaimed: boolean
	finalMultiplierPercents: number
	finalMultiplierReward?: number
	intermediateMultiplierPercents: number
	intermediateMultiplierReward?: number
	ctaCaptionHold: string
	ctaCaptionClaim: string
	info: string
}
