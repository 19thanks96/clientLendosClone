import type {MissionGroupType} from "./mission-group.type";
import type {PiggyBankType} from "./piggy-bank.type";
import type {StoreType} from "./store.type";
import type {GeneralDataType} from "./general-data.type";
import type {TutorialType} from "./tutorial.type";

export type PlayerDataType = {
    mg: MissionGroupType
    pb: PiggyBankType
    store: StoreType
    general: GeneralDataType
    isLiveReload: boolean,
    tutorial?: TutorialType | undefined
}
