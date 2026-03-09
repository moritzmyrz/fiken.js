import { Base } from '../base';
import { Pagination } from '../base';
import { transaction } from '../schemas';

type TransactionsParams = Pagination & {
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

export class Transactions extends Base {
	getTransactions(params?: TransactionsParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<transaction[]>(`/transactions${query ? `?${query}` : ''}`);
	}

	getTransaction(transactionId: number) {
		return this.request<transaction>(`/transactions/${transactionId}`);
	}

	deleteTransaction(transactionId: number) {
		return this.request<void>(`/transactions/${transactionId}/delete`, {
			method: 'PATCH',
		});
	}
}
