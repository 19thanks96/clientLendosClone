import {writable} from "svelte/store";
import {StoreOfferType} from "../../common/enums";
import type {StorePopUpState} from "../../types/storePopup.type";
import {StorePopUpMode} from "../../types/storePopup.type";

export const showPopUpStoreLayout = writable<StorePopUpState>({
	mode: StorePopUpMode.view,
	isOpen: false,
	id: '',
	name: ' ',
	description: ' ',
	price: 0,
	balance: 0,
	type: StoreOfferType.bonusCash,
	isLoading: false,
	purchaseSuccessful: false
})
