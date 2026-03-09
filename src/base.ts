type Config = {
	apiKey: string;
	companySlug: string;
};

export type Pagination = {
	page?: number;
	pageSize?: number;
};

export abstract class Base {
	private apiKey: string;
	private rootPath: string;
	private companyPath: string;
	private companySlug: string;

	constructor(config: Config) {
		this.apiKey = config.apiKey;
		this.companySlug = config.companySlug;
		this.rootPath = 'https://api.fiken.no/api/v2/';
		this.companyPath = `${this.rootPath}companies/${this.companySlug}/`;
	}

	protected request<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.performRequest<T>(this.companyPath + this.trimLeadingSlash(endpoint), options);
	}

	protected requestRoot<T>(endpoint: string, options?: RequestInit): Promise<T> {
		return this.performRequest<T>(this.rootPath + this.trimLeadingSlash(endpoint), options);
	}

	protected prepareParamsForURLSearch<T extends object>(params?: T): Record<string, string> {
		const result: Record<string, string> = {};

		if (!params) return result;

		Object.keys(params).forEach((key) => {
			const value = (params as Record<string, unknown>)[key];
			if (value !== undefined) {
				result[key] = String(value);
			}
		});

		return result;
	}

	private trimLeadingSlash(endpoint: string): string {
		if (endpoint.startsWith('/')) {
			return endpoint.slice(1);
		}

		return endpoint;
	}

	private async performRequest<T>(url: string, options?: RequestInit): Promise<T> {
		const defaultHeaders: HeadersInit = {
			Authorization: `Bearer ${this.apiKey}`,
			Accept: 'application/json',
		};

		const config: RequestInit = {
			...options,
			headers: this.mergeHeaders(defaultHeaders, options?.headers),
		};

		const response = await fetch(url, config);
		const contentType = response.headers.get('content-type') ?? '';
		const isJson = contentType.includes('application/json');
		const bodyText = await response.text();
		const parsedBody = bodyText ? (isJson ? JSON.parse(bodyText) : bodyText) : null;

		if (!response.ok) {
			throw new RequestError(response.status, response.statusText, parsedBody);
		}

		return parsedBody as T;
	}

	private mergeHeaders(defaultHeaders: HeadersInit, customHeaders?: HeadersInit): Headers {
		const headers = new Headers(defaultHeaders);
		if (!customHeaders) {
			return headers;
		}

		new Headers(customHeaders).forEach((value, key) => {
			headers.set(key, value);
		});

		return headers;
	}
}

export class RequestError extends Error {
	readonly status: number;
	readonly payload: unknown;

	constructor(status: number, statusText: string, payload: unknown) {
		super(`${status} ${statusText}`);
		this.status = status;
		this.payload = payload;
	}
}
