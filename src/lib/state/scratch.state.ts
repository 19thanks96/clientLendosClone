import {writable} from "svelte/store";
import type {scratchStateType} from "../../types/scratch.type";
export const scratchState = writable<scratchStateType>({isOpen: false, isScratch: false, isSratchBtnClck: false})
