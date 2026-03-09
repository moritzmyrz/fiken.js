import { Pagination } from '../base';
import { Base } from '../base';
import {
	invoiceishDraftResult,
	timeEntryInvoiceDraftRequest,
	timeEntryRequest,
	timeEntryResult,
	updateTimeEntryRequest,
} from '../schemas';

type TimeEntriesParams = Pagination & {
	date?: string;
	dateGe?: string;
	dateLe?: string;
	projectId?: number;
	activityId?: number;
	timeUserId?: number;
	invoiced?: boolean;
	lastModifiedGe?: string;
	lastModifiedLe?: string;
};

const resourceName = 'timeEntries';

export class TimeEntries extends Base {
	getTimeEntries(params?: TimeEntriesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<timeEntryResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createTimeEntry(timeEntry: timeEntryRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(timeEntry),
		});
	}

	getTimeEntry(timeEntryId: number) {
		return this.request<timeEntryResult>(`${resourceName}/${timeEntryId}`);
	}

	updateTimeEntry(timeEntryId: number, timeEntry: updateTimeEntryRequest) {
		return this.request<void>(`${resourceName}/${timeEntryId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(timeEntry),
		});
	}

	deleteTimeEntry(timeEntryId: number) {
		return this.request<void>(`${resourceName}/${timeEntryId}`, {
			method: 'DELETE',
		});
	}

	createInvoiceDraftFromTimeEntries(payload: timeEntryInvoiceDraftRequest) {
		return this.request<invoiceishDraftResult>(`${resourceName}/createInvoiceDraft`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload),
		});
	}
}
