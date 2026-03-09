import { Base } from '../base';
import { Pagination } from '../base';
import { inboxResult } from '../schemas';

type InboxParams = Pagination & {
	sortBy?: 'createdDate asc' | 'createdDate desc' | 'name asc' | 'name desc';
	status?: 'all' | 'unused' | 'used';
	name?: string;
};

const resourceName = 'inbox';

export class Inbox extends Base {
	getInbox(params?: InboxParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<inboxResult[]>(`${resourceName}${query ? `?${query}` : ''}`);
	}

	createInbox(formData: FormData) {
		return this.request<void>(resourceName, {
			method: 'POST',
			body: formData,
		});
	}

	getInboxDocument(inboxDocumentId: number) {
		return this.request<inboxResult>(`${resourceName}/${inboxDocumentId}`);
	}
}
