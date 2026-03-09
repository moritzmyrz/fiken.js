import { Base } from '../base';
import { Pagination } from '../base';
import {
	attachment,
	invoiceishDraftRequest,
	invoiceishDraftResult,
	payment,
	saleRequest,
	saleResult,
} from '../schemas';

type SalesParams = Pagination & {
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
	settled?: boolean;
};

type DraftListParams = Pagination & {
	lastModified?: string;
	lastModifiedLe?: string;
	lastModifiedLt?: string;
	lastModifiedGe?: string;
	lastModifiedGt?: string;
};

const resourceName = 'sales';

export class Sales extends Base {
	getSales(params?: SalesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<saleResult[]>(`${resourceName}${query ? `?${query}` : ''}`);
	}

	createSale(sale: saleRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(sale),
		});
	}

	getSale(saleId: number) {
		return this.request<saleResult>(`${resourceName}/${saleId}`);
	}

	settledSale(saleId: number, settledDate: string) {
		const query = new URLSearchParams({ settledDate }).toString();
		return this.request<saleResult>(`${resourceName}/${saleId}/settled?${query}`, {
			method: 'PATCH',
		});
	}

	deleteSale(saleId: number, description: string) {
		const query = new URLSearchParams({ description }).toString();
		return this.request<saleResult>(`${resourceName}/${saleId}/delete?${query}`, {
			method: 'PATCH',
		});
	}

	getSaleAttachments(saleId: number) {
		return this.request<attachment[]>(`${resourceName}/${saleId}/attachments`);
	}

	createSaleAttachment(saleId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/${saleId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	getSalePayments(saleId: number) {
		return this.request<payment[]>(`${resourceName}/${saleId}/payments`);
	}

	createSalePayment(saleId: number, salePayment: payment) {
		return this.request<void>(`${resourceName}/${saleId}/payments`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(salePayment),
		});
	}

	getSalePayment(saleId: number, paymentId: number) {
		return this.request<payment>(`${resourceName}/${saleId}/payments/${paymentId}`);
	}

	getSaleDrafts(params?: DraftListParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<invoiceishDraftResult[]>(
			`${resourceName}/drafts${query ? `?${query}` : ''}`
		);
	}

	createSaleDraft(draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	getSaleDraft(draftId: number) {
		return this.request<invoiceishDraftResult>(`${resourceName}/drafts/${draftId}`);
	}

	updateSaleDraft(draftId: number, draft: invoiceishDraftRequest) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(draft),
		});
	}

	deleteSaleDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}`, {
			method: 'DELETE',
		});
	}

	getSaleDraftAttachments(draftId: number) {
		return this.request<attachment[]>(`${resourceName}/drafts/${draftId}/attachments`);
	}

	createSaleDraftAttachment(draftId: number, formData: FormData) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createSaleFromDraft(draftId: number) {
		return this.request<void>(`${resourceName}/drafts/${draftId}/createSale`, {
			method: 'POST',
		});
	}
}
