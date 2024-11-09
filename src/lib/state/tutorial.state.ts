import {writable} from "svelte/store";
import type {Mission} from "../../common/models/mission.type";


export const tutorialState = writable({
    missions: [] as Mission[],
})
