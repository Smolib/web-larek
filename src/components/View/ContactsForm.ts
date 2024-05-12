import {
	EnumContactsFormCSS,
	InterfaceContactsForm,
	TypeContactsFormInputsData,
} from '../../types/components/view/contactsForm';
import { ensureElement } from '../../utils/utils';
import { Form } from './base/Form';

export class ContactsForm extends Form<TypeContactsFormInputsData> implements InterfaceContactsForm {
	protected _emailInputElement: HTMLButtonElement;
	protected _phoneInputElement: HTMLButtonElement;

	constructor(container: HTMLFormElement) {
		super(container, {
			email: 'Выберите электронную почту',
			phone: 'Введите номер телефона',
		});
		this._data = { email: '', phone: '' };

		this._emailInputElement = ensureElement<HTMLButtonElement>(
			EnumContactsFormCSS.emailInputElement,
			this.container
		);
		this._phoneInputElement = ensureElement<HTMLButtonElement>(
			EnumContactsFormCSS.phoneInputElement,
			this.container
		);

		this._emailInputElement.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this._data.email = target.value;
			this._updateErrors();
		});

		this._phoneInputElement.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this._data.phone = target.value;
			this._updateErrors();
		});
	}

	public clearForm() {
		super.clearForm();
		this._data = { email: '', phone: '' };
		this._phoneInputElement.value = this._data.phone;
		this._emailInputElement.value = this._data.email;
	}
}
