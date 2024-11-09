import type {Mission} from "./mission.type";

export type MissionGroupType = {
	id: string
	name: string
	info: string
	dateEnd: Date

	missions: Mission[]
}
