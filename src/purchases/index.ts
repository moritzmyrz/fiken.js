import { Base } from '../base';
import { Pagination } from '../base';
import {
	attachment,
	draftRequest,
	draftResult,
	payment,
	purchaseRequest,
	purchaseResult,
} from '../schemas';

type PurchasesParams = Pagination & {
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

const resourceName = 'purchases';

export class Purchases extends Base {
	getPurchases(params?: PurchasesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<purchaseResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}

	createPurchase(purchase: purchaseRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(purchase),
		});
	}

	getPurchase(purchaseId: number) {
		return this.request<purchaseResult>(`${resourceName}/${purchaseId}`);
	}

	deletePurchase(purchaseId: number, description: string) {
		const query = new URLSearchParams({ description }).toString();
		return this.request<purchaseResult>(
			`${resourceName}/${purchaseId}/delete?${query}`,
			{ method: 'PATCH' }
		);
	}

	getPurchaseAttachments(purchaseId: number) {
		return this.request<attachment[]>(`${resourceName}/${purchaseId}/attachments`);
	}

	createPurchaseAttachment(purchaseId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/${purchaseId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	getPurchasePayments(purchaseId: number) {
		return this.request<payment[]>(`${resourceName}/${purchaseId}/payments`);
	}

	createPurchasePayment(purchaseId: number, purchasePayment: payment) {
		return this.request<void>(`${resourceName}/${purchaseId}/payments`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(purchasePayment),
		});
	}

	getPurchasePayment(purchaseId: number, paymentId: number) {
		return this.request<payment>(
			`${resourceName}/${purchaseId}/payments/${paymentId}`
		);
	}

	getPurchaseDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<draftResult[]>(`${resourceName}/drafts${query ? `?${query}` : ''}`);
	}

	createPurchaseDraft(draft: draftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getPurchaseDraft(draftId: number) {
		return this.request<draftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updatePurchaseDraft(draftId: number, draft: draftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deletePurchaseDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getPurchaseDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createPurchaseDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createPurchaseFromDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/createPurchase`, {
			method: 'POST',
		});
	}
}
