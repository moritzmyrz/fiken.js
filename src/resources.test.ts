import Fiken from './index';
import { contact, invoiceRequest, product } from './schemas';

function mockJsonResponse(payload: unknown) {
	return {
		ok: true,
		status: 200,
		statusText: 'OK',
		headers: new Headers({ 'content-type': 'application/json' }),
		text: async () => JSON.stringify(payload),
	};
}

describe('Resource request contracts', () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		jest.resetAllMocks();
		global.fetch = originalFetch;
	});

	it('serializes contact filters supported by the API', async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(mockJsonResponse([])) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		await client.getContacts({
			memberNumber: 42,
			memberNumberString: '42A',
			customer: true,
			supplier: false,
			inactive: true,
			group: 'vip',
			sortBy: 'name',
		});

		const url = new URL((global.fetch as jest.Mock).mock.calls[0][0] as string);

		expect(url.pathname).toBe('/api/v2/companies/demo-company/contacts');
		expect(url.searchParams.get('memberNumber')).toBe('42');
		expect(url.searchParams.get('memberNumberString')).toBe('42A');
		expect(url.searchParams.get('customer')).toBe('true');
		expect(url.searchParams.get('supplier')).toBe('false');
		expect(url.searchParams.get('inactive')).toBe('true');
		expect(url.searchParams.get('group')).toBe('vip');
		expect(url.searchParams.get('sortBy')).toBe('name');
	});

	it('serializes invoice filters supported by the API', async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(mockJsonResponse([])) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		await client.getInvoices({
			dueDateGe: '2026-01-01',
			customerId: 123,
			settled: false,
			orderReference: 'PO-001',
			invoiceDraftUuid: '5a0f632a-4ab7-4528-95d4-53f3f70c7fe3',
			invoiceNumber: 'INV-1000',
		});

		const url = new URL((global.fetch as jest.Mock).mock.calls[0][0] as string);

		expect(url.pathname).toBe('/api/v2/companies/demo-company/invoices');
		expect(url.searchParams.get('dueDateGe')).toBe('2026-01-01');
		expect(url.searchParams.get('customerId')).toBe('123');
		expect(url.searchParams.get('settled')).toBe('false');
		expect(url.searchParams.get('orderReference')).toBe('PO-001');
		expect(url.searchParams.get('invoiceDraftUuid')).toBe(
			'5a0f632a-4ab7-4528-95d4-53f3f70c7fe3'
		);
		expect(url.searchParams.get('invoiceNumber')).toBe('INV-1000');
	});

	it('sends products as JSON when creating products', async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(mockJsonResponse(null)) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});
		const input: product = {
			name: 'Consulting',
			incomeAccount: '3000',
			vatType: 'high',
			active: true,
		};

		await client.createProduct(input);

		const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
		const headers = new Headers(requestInit.headers as HeadersInit);

		expect(requestInit.method).toBe('POST');
		expect(headers.get('content-type')).toBe('application/json');
		expect(requestInit.body).toBe(JSON.stringify(input));
	});

	it('sends invoices as JSON when creating invoices', async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(mockJsonResponse(null)) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});
		const input: invoiceRequest = {
			issueDate: '2026-02-01',
			cash: false,
			dueDate: '2026-02-15',
			lines: [{ quantity: 1 }],
			customerId: 11,
			bankAccountCode: '1920',
		};

		await client.createInvoice(input);

		const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
		const headers = new Headers(requestInit.headers as HeadersInit);

		expect(requestInit.method).toBe('POST');
		expect(headers.get('content-type')).toBe('application/json');
		expect(requestInit.body).toBe(JSON.stringify(input));
	});

	it('sends contacts as JSON when creating contacts', async () => {
		global.fetch = jest
			.fn()
			.mockResolvedValue(mockJsonResponse(null)) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});
		const input: contact = {
			name: 'Acme AS',
			address: { country: 'NO' },
			groups: [],
			documents: [],
		};

		await client.createContact(input);

		const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
		const headers = new Headers(requestInit.headers as HeadersInit);

		expect(requestInit.method).toBe('POST');
		expect(headers.get('content-type')).toBe('application/json');
		expect(requestInit.body).toBe(JSON.stringify(input));
	});
});
