import {writable} from "svelte/store";
import type {PopUpState} from "../../types/popup.type";

export const initialPopUpLayoutState = {isOpen: false, name: ' ', description: ' ', globalExit: false}
export const showPopUpLayout = writable<PopUpState>({ ...initialPopUpLayoutState })
