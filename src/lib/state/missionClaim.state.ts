import {writable} from "svelte/store";

export const missionClaimState = writable<{isLoading: boolean, missionId: string, success: boolean}>({
	isLoading: false,
	success: false,
	missionId: '',
})
