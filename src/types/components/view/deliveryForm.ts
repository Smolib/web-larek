import { Form } from "../../../components/View/base/Form";

export interface InterfaceDeliveryForm extends Form<TypeDeliveryFormInputsData> {
	clearForm(): void;
}

export enum EnumDeliveryFormCSS {
	template = '#order',
	paymentOnlineButtonElement = '.button_alt[name=card]',
	paymentCashButtonElement = '.button_alt[name=cash]',
	activeToggle = 'button_alt-active',
	addressInputElement = '.form__input[name=address]',
}

export enum EnumDeliveryFormMethod  {
	cash = 'cash',
	online = 'online'
}

export type TypeDeliveryFormInputsData = {
	payment: EnumDeliveryFormMethod,
	address: string
}
