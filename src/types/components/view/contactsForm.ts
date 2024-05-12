import { Form } from "../../../components/View/base/Form"

export interface InterfaceContactsForm extends Form<TypeContactsFormInputsData> {
	clearForm(): void;
}

export enum EnumContactsFormCSS {
	template = '#contacts',
	emailInputElement = '.form__input[name=email]',
	phoneInputElement = '.form__input[name=phone]',
}

export type TypeContactsFormInputsData = {
	email: string,
	phone: string
}
