import { InterfaceView } from "./view";

export interface InterfaceForm extends InterfaceView<EnumFormEvents> {
	clearForm(): void;
	dataInputs: object;
}

export enum EnumFormCSS {
	submitButtonElement = 'button[type=submit]',
	errorsContainerElement = '.form__errors',
}

export enum EnumFormEvents {
	formSubmit = 'form:submit',
}