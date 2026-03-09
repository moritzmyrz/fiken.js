import { Pagination } from '../base';
import { Base } from '../base';
import { bankBalanceResult } from '../schemas';

type BankBalancesParams = Pagination & {
	date?: string;
};

const resourceName = 'bankBalances';

export class BankBalances extends Base {
	getBankBalances(params?: BankBalancesParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<bankBalanceResult[]>(
			`${resourceName}${query ? `?${query}` : ''}`
		);
	}
}
