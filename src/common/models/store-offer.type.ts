import { StoreOfferType } from "../enums"


export type StoreOffer = {
    id: string
    name: string,
    type: StoreOfferType,
    description: string,    
    price: number,
    reward: string
    endDate?: Date
    reusable: boolean
    bet: string
    wager : string
    img: string
}

export type StoreOfferClaimResponse = {
    general: { balance: number },
    store: { offerId: string },
    result: { success: boolean, message: string },
}
