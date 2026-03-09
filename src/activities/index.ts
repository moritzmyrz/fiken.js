import { Pagination } from '../base';
import { Base } from '../base';
import {
	activityRequest,
	activityResult,
	updateActivityRequest,
} from '../schemas';

type ActivitiesParams = Pagination & {
	name?: string;
	archived?: boolean;
};

const resourceName = 'activities';

export class Activities extends Base {
	getActivities(params?: ActivitiesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<activityResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createActivity(activity: activityRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(activity),
		});
	}

	getActivity(activityId: number) {
		return this.request<activityResult>(`${resourceName}/${activityId}`);
	}

	updateActivity(activityId: number, activity: updateActivityRequest) {
		return this.request<void>(`${resourceName}/${activityId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(activity),
		});
	}

	deleteActivity(activityId: number) {
		return this.request<void>(`${resourceName}/${activityId}`, {
			method: 'DELETE',
		});
	}
}
