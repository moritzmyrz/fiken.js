export type bankAccountType =
	| 'normal'
	| 'tax_deduction'
	| 'foreign'
	| 'credit_card';

export type vatType = 'no' | 'yearly' | 'monthly' | 'bi-monthly';

export type invoiceDeliveryMethods =
	| 'email'
	| 'ehf'
	| 'efaktura'
	| 'sms'
	| 'letter'
	| 'auto';

export type emailSendOption = 'document_link' | 'attachment' | 'auto';

export interface accountBalance {
	code?: string;
	name?: string;
	balance?: number;
}

export interface account {
	code?: string;
	name?: string;
}

export interface activityRequest {
	name: string;
	hourlyRate?: number;
	productId?: number;
	billable?: boolean;
	description?: string;
	projectId?: number;
}

export interface activityResult {
	activityId?: number;
	name?: string;
	hourlyRate?: number;
	product?: product;
	billable?: boolean;
	description?: string;
	project?: projectResult;
	archived?: boolean;
}

export interface address {
	country: string;

	streetAddress?: string;
	streetAddressLine2?: string;
	city?: string;
	postCode?: string;
}

export interface attachment {
	identifier?: string;
	downloadUrl?: string;
	downloadUrlWithFikenNormalUserCredentials?: string;
	comment?: string;
	type?: 'invoice' | 'reminder' | 'unspecified' | 'ocr' | 'bank_statement';
}

export interface bankAccountRequest {
	name: string;
	bankAccountNumber: string;
	type: bankAccountType;

	bic?: string;
	iban?: string;
	foreignService?: string;
	inactive?: boolean;
}

export interface bankAccountResult {
	bankAccountId?: number;
	name?: string;
	accountCode?: string;
	bankAccountNumber?: string;
	iban?: string;
	bic?: string;
	foreignService?: string;
	type?: bankAccountType;
	reconciledBalance?: number;
	reconciledDate?: string;
	inactive?: boolean;
}

export interface bankBalanceResult {
	source?: string;
	bankAccountId?: number;
	bankAccountCode?: string;
	date?: string;
	amount?: number;
}

export interface company {
	name?: string;
	slug?: string;
	organizationNumber?: string;
	vatType?: vatType;
	address?: address;
	phoneNumber?: string;
	email?: string;
	creationDate?: string;
	hasApiAccess?: boolean;
	testCompany?: boolean;
	accountingStartDate?: string;
}

export interface contact {
	name: string;

	contactId?: number;
	createdDate?: string;
	lastModifiedDate?: string;
	email?: string;
	organizationNumber?: string;
	customerNumber?: number;
	customerAccountCode?: string;
	phoneNumber?: string;
	memberNumber?: number;
	supplierNumber?: number;
	supplierAccountCode?: string;
	customer?: boolean;
	supplier?: boolean;
	bankAccountNumber?: string;
	contactPerson?: contactPerson[];
	notes?: contactNote[];
	currency?: string;
	language?: string;
	inactive?: boolean;
	daysUntilInvoicingDueDate?: number;
	address: address;
	groups: string[];
	documents: attachment[];
}

export interface contactNote {
	author?: string;
	note?: string;
}

export interface contactPerson {
	name: string;
	email: string;

	contactPersonId?: number;
	phoneNumber?: string;
	address?: address;
}

export interface counter {
	value?: number;
}

export interface creditNoteLineResult {
	unitPrice: number;
	quantity: number;

	incomeAccount?: string;
	vatType?: string;
	discount?: number;
	productId?: number;
	description?: string;
	comment?: string;
}

export interface creditNoteResult {
	creditNoteId: number;
	creditNoteNumber: number;
	customer: contact;
	net: number;
	vat: number;
	gross: number;
	netInNok: number;
	vatInNok: number;
	grossInNok: number;
	address: address;

	kid?: string;
	creditNoteText?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	lines?: invoiceLineResult[];
	currency?: string;
	issueDate?: string;
	settled?: boolean;
	associatedInvoiceId?: number;
	creditNoteDraftUuid?: string;
	creditNotePdf?: attachment;
	project?: projectResult;
}

export interface draftLineRequest {
	text: string;
	vatType: string;
	incomeAccount: string;
	net: number;
	gross: number;

	projectId?: number;
}

export interface draftLineResult {
	text?: string;
	vatType?: string;
	incomeAccount?: string;
	net?: number;
	gross?: number;
	project?: projectResult;
}

export interface draftRequest {
	lines: draftLineRequest[];
	cash: boolean;

	invoiceIssueDate?: string;
	dueDate?: string;
	invoiceNumber?: string;
	contactId?: number;
	projectId?: number;
	currency?: string;
	kid?: string;
	paid?: boolean;
	payments?: payment[];
}

export interface draftResult {
	draftId?: number;
	uuid?: string;
	invoiceIssueDate?: string;
	dueDate?: string;
	invoiceNumber?: string;
	contact?: contact;
	project?: projectResult;
	cash?: boolean;
	currency?: string;
	kid?: string;
	paid?: boolean;
	attachments?: attachment[];
	payments?: payment[];
	lines?: draftLineResult[];
}

export interface fullCreditNoteRequest {
	issueDate: string;
	invoiceId: number;

	creditNoteText?: string;
}

export interface generalJournalEntryRequest {
	journalEntries: journalEntry[];

	description?: string;
	open?: boolean;
}

export interface inboxResult {
	documentId?: number;
	name?: string;
	description?: string;
	filename?: string;
	status?: boolean;
	createdAt?: string;
}

export interface invoiceishDraftLine {
	quantity: number;

	invoiceishDraftLineId?: number;
	lastModifiedDate?: string;
	productId?: number;
	description?: string;
	unitPrice?: number;
	vatType?: string;
	discount?: number;
	comment?: string;
	incomeAccount?: string;
}

export interface invoiceishDraftRequest {
	type:
		| 'invoice'
		| 'cash_invoice'
		| 'offer'
		| 'order_confirmation'
		| 'credit_note';
	daysUntilDueDate: number;
	customerId: number;

	uuid?: string;
	issueDate?: string;
	invoiceText?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	lines?: invoiceishDraftLine[];
	currency?: string;
	bankAccountNumber?: string;
	iban?: string;
	bic?: string;
	paymentAccount?: string;
	contactPersonId?: number;
	projectId?: number;
}

export interface invoiceishDraftResult {
	draftId?: number;
	uuid?: string;
	type?:
		| 'invoice'
		| 'cash_invoice'
		| 'offer'
		| 'order_confirmation'
		| 'credit_note'
		| 'repeating_invoice';
	lastModifiedDate?: string;
	issueDate?: string;
	daysUntilDueDate?: number;
	invoiceText?: string;
	currency?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	lines?: invoiceishDraftLine[];
	net?: number;
	gross?: number;
	bankAccountNumber?: string;
	iban?: string;
	bic?: string;
	paymentAccount?: string;
	customers?: contact[];
	attachments?: attachment[];
	createdFromInvoiceId?: number;
	projectId?: number;
}

export interface invoiceLineRequest {
	quantity: number;

	net?: number;
	vat?: number;
	gross?: number;
	vatType?: string;
	vatInPercent?: number;
	unitPrice?: number;
	discount?: number;
	productName?: string;
	productId?: number;
	description?: string;
	comment?: string;
	incomeAccount?: string;
}

export interface invoiceLineResult {
	net?: number;
	vat?: number;
	gross?: number;
	netInNok?: number;
	vatInNok?: number;
	grossInNok?: number;
	vatType?: string;
	vatInPercent?: number;
	unitPrice?: number;
	quantity?: number;
	discount?: number;
	productId?: number;
	productName?: string;
	description?: string;
	comment?: string;
	incomeAccount?: string;
}

export interface invoiceRequest {
	issueDate: string;
	cash: boolean;
	dueDate: string;
	lines: invoiceLineRequest[];
	customerId: number;
	bankAccountCode: string;

	uuid?: string;
	currency?: string;
	invoiceText?: string;
	paymentAccount?: string;
	contactPersonId?: number;
	projectId?: number;
}

export interface invoiceResult {
	invoiceId?: number;
	createdDate?: string;
	lastModifiedDate?: string;
	invoiceNumber?: number;
	kid?: string;
	issueDate?: string;
	dueDate?: string;
	originalDueDate?: string;
	net?: number;
	vat?: number;
	gross?: number;
	netInNok?: number;
	vatInNok?: number;
	grossInNok?: number;
	cash?: boolean;
	invoiceText?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	invoiceDraftUuid?: string;
	address?: address;
	lines?: invoiceLineResult[];
	currency?: string;
	bankAccountNumber?: string;
	sentManually?: boolean;
	invoicePdf?: attachment;
	associatedCreditNotes?: number[];
	attachments?: attachment[];
	customer?: contact;
	sale?: saleResult;
	project?: projectResult;
}

export interface journalEntryLine {
	amount: number;

	account?: string;
	vatCode?: string;
	debitAccount?: string;
	debitVatCode?: number;
	creditAccount?: string;
	creditVatCode?: number;
	projectId?: number;
	lastModifiedDate?: string;
}

export interface journalEntry {
	lines: journalEntryLine[];
	date: string;
	description: string;

	journalEntryId?: number;
	createdDate?: string;
	lastModifiedDate?: string;
	transactionId?: number;
	offsetTransactionId?: number;
	journalEntryNumber?: number;
	attachments?: attachment[];
}

export interface offer {
	offerId?: number;
	offerDraftUuid?: string;
	date?: string;
	offerNumber?: number;
	net?: number;
	vat?: number;
	gross?: number;
	comment?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	discount?: number;
	address?: address;
	lines?: invoiceLineResult[];
	currency?: string;
	contactId?: number;
	contactPersonId?: number;
	projectId?: number;
	archived?: boolean;
}

export interface orderConfirmation {
	confirmationId?: number;
	confirmationDraftUuid?: string;
	date?: string;
	confirmationNumber?: number;
	net?: number;
	vat?: number;
	gross?: number;
	comment?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	discount?: number;
	address?: address;
	lines?: invoiceLineResult[];
	currency?: string;
	contactId?: number;
	contactPersonId?: number;
	projectId?: number;
	archived?: boolean;
	internalComment?: string;
}

export interface orderLine {
	vatType: string;

	description?: string;
	netPrice?: number;
	vat?: number;
	account?: string;
	netPriceInCurrency?: number;
	vatInCurrency?: number;
	projectId?: number;
}

export interface partialCreditNoteRequest {
	issueDate: string;
	lines: creditNoteLineResult[];

	ourReference?: string;
	yourReference?: string;
	orderReference?: string;
	project?: number;
	currency?: string;
	invoiceId?: number;
	contactId?: number;
	contactPersonId?: number;
	creditNoteText?: string;
}

export interface payment {
	date: string;
	account: string;
	amount: number;

	paymentId?: number;
	amountInNok?: number;
	currency?: string;
	fee?: number;
}

export interface product {
	name: string;
	incomeAccount: string;
	vatType: string;
	active: boolean;

	productId?: number;
	createdDate?: string;
	lastModifiedDate?: string;
	unitPrice?: number;
	productNumber?: string;
	stock?: number;
	note?: string;
}

export interface productSalesLineInfo {
	count?: number;
	sales?: number;
	netAmount?: number;
	vatAmount?: number;
	grossAmount?: number;
}

export interface productSalesReportRequest {
	from: string;
	to: string;
}

export interface productSalesReportResult {
	product?: product;
	sold?: productSalesLineInfo;
	credited?: productSalesLineInfo;
	sum?: productSalesLineInfo;
}

export interface projectRequest {
	startDate: string;

	number?: string;
	name?: string;
	description?: string;
	endDate?: string;
	contactId?: number;
	completed?: boolean;
}

export interface projectResult {
	projectId?: number;
	number?: string;
	name?: string;
	description?: string;
	startDate?: string;
	endDate?: string;
	contact?: contact;
	completed?: boolean;
}

export interface purchaseRequest {
	kind: 'cash_purchase' | 'supplier_purchase';
	lines: orderLine[];
	currency: string;
	date: string;

	transactionId?: number;
	identifier?: string;
	dueDate?: string;
	supplierId?: number;
	paymentAccount?: string;
	paymentDate?: string;
	kid?: string;
	projectId?: number;
}

export interface purchaseResult {
	date: string;
	kind: 'cash_purchase' | 'supplier_purchase';
	paid: boolean;
	lines: orderLine[];
	currency: string;

	purchaseId?: number;
	transactionId?: number;
	identifier?: string;
	dueDate?: string;
	supplier: contact;
	paymentAccount?: string;
	paymentDate?: string;
	payments?: payment[];
	purchaseAttachments?: attachment[];
	kid?: string;
	project?: projectResult;
	deleted?: boolean;
}

export interface saleRequest {
	date: string;
	kind: 'cash_sale' | 'invoice' | 'external_invoice';
	lines: orderLine[];
	currency: string;

	saleNumber?: string;
	totalPaid?: number;
	totalPaidInCurrency?: number;
	customerId?: number;
	dueDate?: string;
	kid?: string;
	paymentAccount?: string;
	paymentDate?: string;
	paymentFee?: number;
	projectId?: number;
}

export interface saleResult {
	saleId?: number;
	lastModifiedDate?: string;
	transactionId?: number;
	saleNumber?: string;
	date?: string;
	kind?: 'cash_sale' | 'invoice' | 'external_invoice';
	netAmount?: number;
	vatAmount?: number;
	settled?: boolean;
	settledDate?: string;
	writeOff?: boolean;
	totalPaid?: number;
	totalPaidInCurrency?: number;
	outstandingBalance?: number;
	lines?: orderLine[];
	customer?: contact;
	currency?: string;
	dueDate?: string;
	kid?: string;
	paymentAccount?: string;
	salePayments?: payment[];
	saleAttachments?: attachment[];
	paymentDate?: string;
	project?: projectResult;
	deleted?: boolean;
}

export interface sendInvoiceishRequest {
	method: invoiceDeliveryMethods;
	includeDocumentAttachments: boolean;

	receipentName?: string;
	recipientEmail?: string;
	message?: string;
	emailSendOption?: emailSendOption;
	mergeInvoiceAndAttachments?: boolean;
	organizationNumber?: string;
	mobileNumber?: string;
}

export interface sendInvoiceRequest {
	method: invoiceDeliveryMethods;
	includeDocumentAttachments: boolean;
	creditNoteId: number;

	receipentName?: string;
	recipientEmail?: string;
	message?: string;
	emailSendOption?: emailSendOption;
	mergeInvoiceAndAttachments?: boolean;
	organizationNumber?: string;
	mobileNumber?: string;
}

export interface sendInvoiceResult {
	method: invoiceDeliveryMethods;
	includeDocumentAttachments: boolean;
	invoiceId: number;

	receipentName?: string;
	recipientEmail?: string;
	message?: string;
	emailSendOption?: emailSendOption;
	mergeInvoiceAndAttachments?: boolean;
	organizationNumber?: string;
	mobileNumber?: string;
}

export interface transaction {
	transactionId?: number;
	createdDate?: string;
	lastModifiedDate?: string;
	description?: string;
	type?: string;
	entries?: journalEntry[];
}

export interface timeEntryInvoiceDraftRequest {
	timeEntryIds: number[];
	customerId: number;
	daysUntilDueDate: number;
	groupBy?: 'activity' | 'activityAndPerson' | 'none';
	includeTimeEntryDescriptions?: boolean;
	issueDate?: string;
	projectId?: number;
	invoiceText?: string;
	yourReference?: string;
	ourReference?: string;
	orderReference?: string;
	currency?: string;
	bankAccountNumber?: string;
}

export interface timeEntryRequest {
	date: string;
	hours: number;
	activityId: number;
	timeUserId: number;
	startTime?: string;
	description?: string;
	internalNote?: string;
	projectId?: number;
}

export interface timeEntryResult {
	timeEntryId?: number;
	date?: string;
	hours?: number;
	startTime?: string;
	endTime?: string;
	description?: string;
	internalNote?: string;
	activity?: activityResult;
	project?: projectResult;
	timeUser?: timeUserResult;
	invoiced?: boolean;
	locked?: boolean;
	createdDate?: string;
	lastModifiedDate?: string;
}

export interface timeUserResult {
	timeUserId?: number;
	name?: string;
	email?: string;
	createdDate?: string;
	lastModifiedDate?: string;
}

export interface updateInvoiceRequest {
	newDueDate?: string;
	sentManually?: boolean;
}

export interface updateProjectRequest {
	name?: string;
	description?: string;
	startDate?: string;
	endDate?: string;
	contactId?: number;
	completed?: boolean;
}

export interface updateActivityRequest {
	name?: string;
	hourlyRate?: number;
	productId?: number;
	billable?: boolean;
	description?: string;
	projectId?: number;
}

export interface updateTimeEntryRequest {
	date?: string;
	hours?: number;
	startTime?: string;
	description?: string;
	internalNote?: string;
	activityId?: number;
	projectId?: number;
}

export interface userinfo {
	name?: string;
	email?: string;
}
