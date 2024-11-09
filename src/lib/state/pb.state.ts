import {writable} from "svelte/store";
import type {PlayerDataType} from "../../common/models/player-data.type";

export const pbState = writable<PbStateModel>({
    id: '',
    desiredHoldDepositAmount: 0,
    bankRemainingBalance: 0,
    currentClaimAmount: 0,
    step: 0,
    reward: 0,
    isLoading: false
})

export const syncWithPlayerPbState = (playerState: PlayerDataType) => {
    const bankRemainingBalance = playerState.pb.balanceMax - playerState.pb.balance;
    const desiredHoldDepositAmount = playerState.general.balance > bankRemainingBalance
        ? bankRemainingBalance
        : playerState.general.balance;

    pbState.update(state => ({
        ...state,
        id: playerState.pb.id,
        desiredHoldDepositAmount: 0,
        bankRemainingBalance,
        currentClaimAmount: 0,
        reward: playerState.pb.reward,
        step: playerState.general.balance > 0 ? Math.ceil(playerState.pb.balanceMax / 5) : 0,
        isLoading: false
    }));
};

export type PbStateModel = {
    id: string
    desiredHoldDepositAmount: number
    bankRemainingBalance: number
    currentClaimAmount: number
    step: number
    reward: number
    isLoading: boolean
}
