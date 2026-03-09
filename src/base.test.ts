import Fiken from './index';
import { Base } from './base';

class BaseHarness extends Base {
	callPrepareParams(params?: Record<string, unknown>) {
		return this.prepareParamsForURLSearch(params);
	}

	callRequest<T>(endpoint: string, options?: RequestInit) {
		return this.request<T>(endpoint, options);
	}
}

describe('Base', () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		jest.resetAllMocks();
		global.fetch = originalFetch;
	});

	it('serializes params and excludes undefined values', () => {
		const harness = new BaseHarness({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		expect(
			harness.callPrepareParams({
				page: 1,
				settled: false,
				name: 'invoice',
				ignored: undefined,
			})
		).toEqual({
			page: '1',
			settled: 'false',
			name: 'invoice',
		});
	});

	it('merges default and custom headers', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			statusText: 'OK',
			headers: new Headers({ 'content-type': 'application/json' }),
			text: async () => JSON.stringify({ ok: true }),
		}) as unknown as typeof fetch;

		const harness = new BaseHarness({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		await harness.callRequest<{ ok: boolean }>('contacts', {
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const [, requestInit] = (global.fetch as jest.Mock).mock.calls[0];
		const headers = new Headers(requestInit.headers);

		expect(headers.get('authorization')).toBe('Bearer secret');
		expect(headers.get('accept')).toBe('application/json');
		expect(headers.get('content-type')).toBe('application/json');
	});

	it('returns null on successful empty response bodies', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 204,
			statusText: 'No Content',
			headers: new Headers(),
			text: async () => '',
		}) as unknown as typeof fetch;

		const harness = new BaseHarness({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		const result = await harness.callRequest<void>('contacts/1', {
			method: 'DELETE',
		});

		expect(result).toBeNull();
	});

	it('throws RequestError with status and payload', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: false,
			status: 400,
			statusText: 'Bad Request',
			headers: new Headers({ 'content-type': 'application/json' }),
			text: async () => JSON.stringify({ message: 'Invalid input' }),
		}) as unknown as typeof fetch;

		const harness = new BaseHarness({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		await expect(harness.callRequest('contacts')).rejects.toMatchObject({
			status: 400,
			payload: { message: 'Invalid input' },
		});
	});
});

describe('Fiken root endpoints', () => {
	const originalFetch = global.fetch;

	afterEach(() => {
		jest.resetAllMocks();
		global.fetch = originalFetch;
	});

	it('calls the root companies endpoint', async () => {
		global.fetch = jest.fn().mockResolvedValue({
			ok: true,
			status: 200,
			statusText: 'OK',
			headers: new Headers({ 'content-type': 'application/json' }),
			text: async () => JSON.stringify([]),
		}) as unknown as typeof fetch;

		const client = new Fiken({
			apiKey: 'secret',
			companySlug: 'demo-company',
		});

		await client.getCompanies({ page: 2 });

		expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe(
			'https://api.fiken.no/api/v2/companies?page=2'
		);
	});
});
