import {writable} from "svelte/store";

export const initialShowInfoPopUpState = {isOpen: false}
export const showInfoPopUp = writable<{isOpen:boolean}>({ ...initialShowInfoPopUpState })