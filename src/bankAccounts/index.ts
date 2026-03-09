import { Base } from '../base';
import { bankAccountRequest, bankAccountResult } from '../schemas';
import { BankAccountsParams } from './types';

const resourceName = 'bankAccounts';

export class BankAccounts extends Base {
	getBankAccounts(params?: BankAccountsParams) {
		const searchParams = this.prepareParamsForURLSearch(params);
		const query = new URLSearchParams(searchParams).toString();
		const queryString = query ? `?${query}` : '';

		return this.request<bankAccountResult[]>(resourceName + queryString);
	}

	getBankAccount(bankAccountId: number) {
		return this.request<bankAccountResult>(`${resourceName}/${bankAccountId}`);
	}

	createBankAccount(params: bankAccountRequest) {
		return this.request<void>(resourceName, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(params),
		});
	}
}
