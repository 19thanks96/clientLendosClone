import {writable} from "svelte/store";
import type {PlayerDataType} from "../../common/models/player-data.type";
import type {MissionGroupType} from "../../common/models/mission-group.type";
import type {PiggyBankType} from "../../common/models/piggy-bank.type";
import type {StoreType} from "../../common/models/store.type";
import type {GeneralDataType} from "../../common/models/general-data.type";

export const playerState = writable<PlayerDataType & { isInitialized: boolean }>({
    mg: {} as MissionGroupType,
    pb: {} as PiggyBankType,
    store: {} as StoreType,
    general: {} as GeneralDataType,
    isInitialized: false,
    isLiveReload: false,
    tutorial: undefined
})
