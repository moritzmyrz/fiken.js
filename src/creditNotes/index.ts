import { Base } from '../base';
import {
	attachment,
	counter,
	creditNoteResult,
	fullCreditNoteRequest,
	invoiceishDraftRequest,
	invoiceishDraftResult,
	partialCreditNoteRequest,
	sendInvoiceRequest,
} from '../schemas';
import { Pagination } from '../base';

type CreditNoteListParams = Pagination & {
	issueDate?: string;
	issueDateLe?: string;
	issueDateLt?: string;
	issueDateGe?: string;
	issueDateGt?: string;
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

type DraftListParams = Pagination & {
	lastModified?: string;
	lastModifiedLe?: string;
	lastModifiedLt?: string;
	lastModifiedGe?: string;
	lastModifiedGt?: string;
};

const resourceName = 'creditNotes';

export class CreditNotes extends Base {
	getCreditNotes(params?: CreditNoteListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<creditNoteResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createFullCreditNote(creditNote: fullCreditNoteRequest) {
		return this.request<void>(`${resourceName}/full`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(creditNote),
		});
	}

	createPartialCreditNote(creditNote: partialCreditNoteRequest) {
		return this.request<void>(`${resourceName}/partial`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(creditNote),
		});
	}

	getCreditNote(creditNoteId: number) {
		return this.request<creditNoteResult>(`${resourceName}/${creditNoteId}`);
	}

	sendCreditNote(sendCreditNoteRequest: sendInvoiceRequest) {
		return this.request<void>(`${resourceName}/send`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sendCreditNoteRequest),
		});
	}

	getCreditNoteCounter() {
		return this.request<counter>(`${resourceName}/counter`);
	}

	createCreditNoteCounter(counterRequest?: counter) {
		return this.request<void>(`${resourceName}/counter`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(counterRequest ?? {}),
		});
	}

	getCreditNoteDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceishDraftResult[]>(
			`${resourceName}/drafts${query ? `?${query}` : ''}`
		);
	}

	createCreditNoteDraft(draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getCreditNoteDraft(draftId: number) {
		return this.request<invoiceishDraftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updateCreditNoteDraft(draftId: number, draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deleteCreditNoteDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getCreditNoteDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createCreditNoteDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createCreditNoteFromDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/createCreditNote`, {
			method: 'POST',
		});
	}
}
