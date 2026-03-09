import { Base } from '../base';
import { Pagination } from '../base';
import {
	attachment,
	counter,
	invoiceishDraftRequest,
	invoiceishDraftResult,
	orderConfirmation,
} from '../schemas';

type OrderConfirmationListParams = Pagination & {
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

type DraftListParams = Pagination & {
	lastModified?: string;
	lastModifiedLe?: string;
	lastModifiedLt?: string;
	lastModifiedGe?: string;
	lastModifiedGt?: string;
};

const resourceName = 'orderConfirmations';

export class OrderConfirmations extends Base {
	getOrderConfirmations(params?: OrderConfirmationListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<orderConfirmation[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	getOrderConfirmation(confirmationId: number) {
		return this.request<orderConfirmation>(`${resourceName}/${confirmationId}`);
	}

	getOrderConfirmationCounter() {
		return this.request<counter>(`${resourceName}/counter`);
	}

	getOrderConfirmationCounters() {
		return this.getOrderConfirmationCounter();
	}

	createOrderConfirmationCounter(counterRequest?: counter) {
		return this.request<void>(`${resourceName}/counter`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(counterRequest ?? {}),
		});
	}

	createInvoiceDraftFromOrderConfirmation(confirmationId: number) {
		return this.request<void>(
			`${resourceName}/${confirmationId}/createInvoiceDraft`,
			{ method: 'POST' }
		);
	}

	getOrderConfirmationDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceishDraftResult[]>(
			`${resourceName}/drafts${query ? `?${query}` : ''}`
		);
	}

	createOrderConfirmationDraft(draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getOrderConfirmationDraft(draftId: number) {
		return this.request<invoiceishDraftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updateOrderConfirmationDraft(draftId: number, draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deleteOrderConfirmationDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getOrderConfirmationDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createOrderConfirmationDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createOrderConfirmationFromDraft(draftId: number) {
		return this.request<void>(
			`${resourceName}/drafts/${draftId}/createOrderConfirmation`,
			{ method: 'POST' }
		);
	}
}
