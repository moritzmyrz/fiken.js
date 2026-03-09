import { Pagination } from '../base';
import { Base } from '../base';
import { timeUserResult } from '../schemas';

type TimeUsersParams = Pagination & {
	name?: string;
	email?: string;
};

const resourceName = 'timeUsers';

export class TimeUsers extends Base {
	getTimeUsers(params?: TimeUsersParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<timeUserResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	getTimeUser(timeUserId: number) {
		return this.request<timeUserResult>(`${resourceName}/${timeUserId}`);
	}
}
