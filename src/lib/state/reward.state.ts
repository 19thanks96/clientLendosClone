import {writable} from "svelte/store";
import type {RewardState} from "../../types/reward.type";

export const rewardState = writable<RewardState>({isOpen: false, amount: 0, entityId: null})
