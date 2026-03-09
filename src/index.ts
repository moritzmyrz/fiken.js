import { AccountBalances } from './accountBalances';
import { Accounts } from './accounts';
import { BankAccounts } from './bankAccounts';
import { Base } from './base';
import { Contacts } from './contacts';
import { CreditNotes } from './creditNotes';
import { Groups } from './groups';
import { Inbox } from './inbox';
import { Invoices } from './invoices';
import { Offers } from './offers';
import { OrderConfirmations } from './orderConfirmations';
import { Products } from './products';
import { Projects } from './projects';
import { Purchases } from './purchases';
import { Sales } from './sales';
import { company } from './schemas';
import { Transactions } from './transactions';
import { CompaniesParams } from './types';
import { applyMixins } from './utils';

class Fiken extends Base {
	getCompanies(params?: CompaniesParams) {
		const searchParams = this.prepareParamsForURLSearch(params);
		const query = new URLSearchParams(searchParams).toString();
		const queryString = query ? `?${query}` : '';

		return this.requestRoot<company[]>(`companies${queryString}`);
	}

	getCompany(companySlug: string) {
		return this.requestRoot<company>(`companies/${companySlug}`);
	}
}

interface Fiken
	extends Contacts,
		Accounts,
		AccountBalances,
		Groups,
		BankAccounts,
		Products,
		Transactions,
		Invoices,
		CreditNotes,
		Projects,
		Offers,
		Inbox,
		OrderConfirmations,
		Purchases,
		Sales {}

applyMixins(Fiken, [
	Contacts,
	Accounts,
	AccountBalances,
	Groups,
	BankAccounts,
	Products,
	Transactions,
	Invoices,
	CreditNotes,
	Offers,
	Projects,
	Inbox,
	OrderConfirmations,
	Purchases,
	Sales,
]);

export default Fiken;
