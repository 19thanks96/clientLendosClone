export type ScratchCardType = {
    id: string
    jackpotBase: number,
    endDate: string,
    costOfScratch: number,
    buttonText: string,
    title: string,
    description: string,
    jackpotDescription: string,
    reward: {} | null,
    type:string,
    error:string | undefined
}