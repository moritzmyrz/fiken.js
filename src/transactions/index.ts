import { Base } from '../base';
import { transaction } from '../schemas';

export class Transactions extends Base {
	getTransactions() {
		return this.request<transaction[]>('/transactions');
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
