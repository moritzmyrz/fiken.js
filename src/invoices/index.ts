import { Base } from '../base';
import {
	attachment,
	counter,
	invoiceRequest,
	invoiceResult,
	invoiceishDraftRequest,
	invoiceishDraftResult,
	sendInvoiceRequest,
	updateInvoiceRequest,
} from '../schemas';
import { Pagination } from '../base';

type InvoiceListParams = Pagination & {
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
	settled?: boolean;
};

type DraftListParams = Pagination & {
	lastModified?: string;
	lastModifiedLe?: string;
	lastModifiedLt?: string;
	lastModifiedGe?: string;
	lastModifiedGt?: string;
};

const resourceName = 'invoices';

export class Invoices extends Base {
	getInvoices(params?: InvoiceListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createInvoice(invoice: invoiceRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(invoice),
		});
	}

	getInvoice(invoiceId: number) {
		return this.request<invoiceResult>(`${resourceName}/${invoiceId}`);
	}

	updateInvoice(invoiceId: number, invoice: updateInvoiceRequest) {
		return this.request<void>(`${resourceName}/${invoiceId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(invoice),
		});
	}

	getInvoiceAttachments(invoiceId: number) {
		return this.request<attachment[]>(`${resourceName}/${invoiceId}/attachments`);
	}

	createInvoiceAttachment(invoiceId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/${invoiceId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	sendInvoice(sendInvoiceRequest: sendInvoiceRequest) {
		return this.request<void>(`${resourceName}/send`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sendInvoiceRequest),
		});
	}

	getInvoiceCounter() {
		return this.request<counter>(`${resourceName}/counter`);
	}

	createInvoiceCounter(invoiceCounter?: counter) {
		return this.request<void>(`${resourceName}/counter`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(invoiceCounter ?? {}),
		});
	}

	getInvoiceDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceishDraftResult[]>(
			`${resourceName}/drafts${query ? `?${query}` : ''}`
		);
	}

	createInvoiceDraft(draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getInvoiceDraft(draftId: number) {
		return this.request<invoiceishDraftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updateInvoiceDraft(draftId: number, draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deleteInvoiceDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getInvoiceDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createInvoiceDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createInvoiceFromDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/createInvoice`, {
			method: 'POST',
		});
	}
}
