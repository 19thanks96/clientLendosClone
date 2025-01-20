import Tracker from '@openreplay/tracker'

export const initOpenReplay = async (userId: string, browser: boolean) => {
	try {
		if (browser) {
			const tracker = new Tracker({
				projectKey: import.meta.env.VITE_OR_KEY,
				ingestPoint: import.meta.env.VITE_OR_ENDPOINT,
				crossdomain: {
					parentDomain: '*'
				}
			});

			await tracker.start({userID: userId + '-iframe' ?? ''});
		}
	} catch (e) {
		console.error(e);
	}
}
