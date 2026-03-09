import { Pagination } from '../base';
import { Base } from '../base';
import {
	attachment,
	generalJournalEntryRequest,
	journalEntry,
} from '../schemas';

type JournalEntriesParams = Pagination & {
	date?: string;
	dateLe?: string;
	dateLt?: string;
	dateGe?: string;
	dateGt?: string;
	lastModified?: string;
	lastModifiedLe?: string;
	lastModifiedLt?: string;
	lastModifiedGe?: string;
	lastModifiedGt?: string;
	createdDate?: string;
	createdDateLe?: string;
	createdDateLt?: string;
	createdDateGe?: string;
	createdDateGt?: string;
};

const resourceName = 'journalEntries';

export class JournalEntries extends Base {
	getJournalEntries(params?: JournalEntriesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<journalEntry[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createGeneralJournalEntry(entry: generalJournalEntryRequest) {
		return this.request<void>('generalJournalEntries', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(entry),
		});
	}

	getJournalEntry(journalEntryId: number) {
		return this.request<journalEntry>(`${resourceName}/${journalEntryId}`);
	}

	getJournalEntryAttachments(journalEntryId: number) {
		return this.request<attachment[]>(`${resourceName}/${journalEntryId}/attachments`);
	}

	addAttachmentToJournalEntry(journalEntryId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/${journalEntryId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}
}
