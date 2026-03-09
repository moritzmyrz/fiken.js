# fiken.js

TypeScript wrapper for the [Fiken API v2](https://api.fiken.no/api/v2/docs/).

## Install

```bash
npm install fiken.js
```

## Usage

```ts
import Fiken from 'fiken.js';

const client = new Fiken({
	apiKey: process.env.FIKEN_API_KEY as string,
	companySlug: 'my-company-slug',
});

const companies = await client.getCompanies();
const accounts = await client.getAccounts({ page: 1, pageSize: 50 });
const invoices = await client.getInvoices({ page: 1, pageSize: 50 });
```

## Implemented API areas

- Companies and user info
- Accounts, account balances, bank accounts, bank balances
- Contacts, groups, products, transactions, journal entries
- Invoices, credit notes, offers, order confirmations
- Sales, purchases, inbox, projects
- Time entries, activities, time users

All endpoints are based on the published Fiken OpenAPI document in this repository (`swagger (2).yaml`).

## Development

```bash
npm install
npm run check
npm run build
```

### Scripts

- `npm run lint` - eslint for `src/**/*.ts`
- `npm run typecheck` - TypeScript compile checks
- `npm run test` - Jest tests
- `npm run build` - build distributable package
- `npm run check` - typecheck + lint + test
