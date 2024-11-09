import { MAIN_API_URL } from '$env/static/private';
import {ApiRoutes} from "./api-routes";

const getAvailableMissionGroup = async (externalId: string, apiKey: string) => {
	return await fetch(`${MAIN_API_URL}${ApiRoutes.MG_ENDPOINT}?externalId=${externalId}&apiKey=${apiKey}`)
}

export const ApiClient = {
	getAvailableMissionGroup,
}
