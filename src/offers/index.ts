import { Base } from '../base';
import { Pagination } from '../base';
import {
	attachment,
	counter,
	invoiceishDraftRequest,
	invoiceishDraftResult,
	offer,
	sendInvoiceishRequest,
} from '../schemas';

type OfferListParams = Pagination & {
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

const resourceName = 'offers';

export class Offers extends Base {
	getOffers(params?: OfferListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<offer[]>(`${resourceName}${query ? `?${query}` : ''}`);
	}

	getOffer(offerId: number) {
		return this.request<offer>(`${resourceName}/${offerId}`);
	}

	getOfferCounter() {
		return this.request<counter>(`${resourceName}/counter`);
	}

	getOfferCounters() {
		return this.getOfferCounter();
	}

	createOfferCounter(counterRequest?: counter) {
		return this.request<void>(`${resourceName}/counter`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(counterRequest ?? {}),
		});
	}

	getOfferDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceishDraftResult[]>(
			`${resourceName}/drafts${query ? `?${query}` : ''}`
		);
	}

	createOfferDraft(draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getOfferDraft(draftId: number) {
		return this.request<invoiceishDraftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updateOfferDraft(draftId: number, draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deleteOfferDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getOfferDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createOfferDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createOfferFromDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/createOffer`, {
			method: 'POST',
		});
	}

	sendOffer(sendOfferRequest: sendInvoiceishRequest) {
		return this.request<void>(`${resourceName}/send`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sendOfferRequest),
		});
	}
}
