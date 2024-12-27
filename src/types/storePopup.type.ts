import { StoreOfferType } from "../common/enums";

export enum StorePopUpMode {
	view,
	claim
}

export type StorePopUpState = {
	mode: StorePopUpMode,
	isOpen: boolean,
	isLoading: boolean,
	purchaseSuccessful: boolean,
	id: string;
	name: string;
    description: string;
    type: StoreOfferType,
    price: number;
	balance: number,
    endDate?: Date
	img: string,
}

