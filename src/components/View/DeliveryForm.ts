import { Form } from './base/Form';
import { ensureElement } from '../../utils/utils';
import {
	EnumDeliveryFormCSS,
	EnumDeliveryFormMethod,
	InterfaceDeliveryForm,
	TypeDeliveryFormInputsData,
} from '../../types/components/view/deliveryForm';

export class DeliveryForm extends Form<TypeDeliveryFormInputsData> implements InterfaceDeliveryForm  {
	protected _paymentOnlineButtonElement: HTMLButtonElement;
	protected _paymentCashButtonElement: HTMLButtonElement;
	protected _addressInputElement: HTMLButtonElement;

	constructor(container: HTMLFormElement) {
		super(container, {
			payment: 'Выберите способ оплаты',
			address: 'Введите адрес для доставки',
		});
		this._data = { payment: EnumDeliveryFormMethod.online, address: '' };

		this._paymentOnlineButtonElement = ensureElement<HTMLButtonElement>(
			EnumDeliveryFormCSS.paymentOnlineButtonElement,
			this.container
		);

		this._paymentCashButtonElement = ensureElement<HTMLButtonElement>(
			EnumDeliveryFormCSS.paymentCashButtonElement,
			this.container
		);

		this._addressInputElement = ensureElement<HTMLButtonElement>(
			EnumDeliveryFormCSS.addressInputElement,
			this.container
		);

		this._paymentOnlineButtonElement.addEventListener('click', () => {
			this._data.payment = EnumDeliveryFormMethod.online;
			this._updateToggle();
			this._updateErrors();
		});

		this._paymentCashButtonElement.addEventListener('click', () => {
			this._data.payment = EnumDeliveryFormMethod.cash;
			this._updateToggle();
			this._updateErrors();
		});

		this._addressInputElement.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			this._data.address = target.value;
			this._updateErrors();
		});

		this._updateToggle();
	}

	protected _updateToggle() {
		this._paymentOnlineButtonElement.classList.toggle(
			EnumDeliveryFormCSS.activeToggle,
			this._data.payment === EnumDeliveryFormMethod.online
		);
		this._paymentCashButtonElement.classList.toggle(
			EnumDeliveryFormCSS.activeToggle,
			this._data.payment === EnumDeliveryFormMethod.cash
		);
	}

	public clearForm() {
		super.clearForm();
		this._data = { payment: EnumDeliveryFormMethod.online, address: '' };
		this._addressInputElement.value = this._data.address;
		this._updateToggle();
	}
}
