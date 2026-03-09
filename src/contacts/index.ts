import { Base } from '../base';
import { contact, contactPerson } from '../schemas';
import { Pagination } from '../base';

type ContactsParams = Pagination & {
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
	supplierNumber?: number;
	customerNumber?: number;
	organizationNumber?: string;
	memberNumber?: number;
	memberNumberString?: string;
	name?: string;
	email?: string;
	customer?: boolean;
	supplier?: boolean;
	inactive?: boolean;
	group?: string;
	sortBy?: string;
};

export class Contacts extends Base {
	getContacts(params?: ContactsParams) {
		const query = new URLSearchParams(this.prepareParamsForURLSearch(params)).toString();
		return this.request<contact[]>(`/contacts${query ? `?${query}` : ''}`);
	}

	createContact(contact: contact) {
		return this.request<contact>('/contacts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contact),
		});
	}

	getContact(contactId: number) {
		return this.request<contact>(`/contacts/${contactId}`);
	}

	updateContact(contactId: number, updatedContact: contact) {
		return this.request<contact>(`/contacts/${contactId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedContact),
		});
	}

	deleteContact(contactId: number) {
		return this.request<contact>(`/contacts/${contactId}`, {
			method: 'DELETE',
		});
	}

	getContactPersons(contactId: number) {
		return this.request<contactPerson[]>(
			`/contacts/${contactId}/contactPerson`
		);
	}

	addAttachmentToContact(contactId: number, formData: FormData) {
		return this.request<void>(`/contacts/${contactId}/attachments`, {
			method: 'POST',
			body: formData,
		});
	}

	createContactPersonAttachment(contactId: number, formData: FormData) {
		return this.addAttachmentToContact(contactId, formData);
	}

	getContactPerson(contactId: number, contactPersonId: number) {
		return this.request<contactPerson>(
			`/contacts/${contactId}/contactPerson/${contactPersonId}`
		);
	}

	createContactPerson(contactId: number, contactPerson: contactPerson) {
		return this.request<void>(`/contacts/${contactId}/contactPerson`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(contactPerson),
		});
	}

	updateContactPerson(
		contactId: number,
		contactPersonId: number,
		contactPerson: contactPerson
	) {
		return this.request<void>(
			`/contacts/${contactId}/contactPerson/${contactPersonId}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(contactPerson),
			}
		);
	}

	deleteContactPerson(contactId: number, contactPersonId: number) {
		return this.request<void>(
			`/contacts/${contactId}/contactPerson/${contactPersonId}`,
			{
				method: 'DELETE',
			}
		);
	}
}
