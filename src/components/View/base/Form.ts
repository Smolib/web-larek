import { View } from './View';
import { EnumFormCSS, EnumFormEvents, InterfaceForm } from '../../../types/components/view/base/form';
import { createElement, ensureElement } from '../../../utils/utils';

export abstract class Form<T extends object> extends View<EnumFormEvents> implements InterfaceForm  {
	protected _submitButtonElement: HTMLButtonElement;
	protected _errorsTextElement: HTMLElement;
	protected _data: T;
	protected _errors: { [K in keyof T]: string }

	constructor(
		container: HTMLFormElement,
		errors: { [K in keyof T]: string }
	) {
		super(container);
		this._errors = errors;
		this._submitButtonElement = ensureElement<HTMLButtonElement>(
			EnumFormCSS.submitButtonElement,
			this.container
		);
		this._errorsTextElement = ensureElement<HTMLElement>(EnumFormCSS.errorsContainerElement, this.container);
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this._emit(EnumFormEvents.formSubmit);
		});
	}

	protected _disableSubmitButton(isDisabled: boolean) {
		this._submitButtonElement.disabled = isDisabled;
	}
	
	protected _clearErrors() {
		this._errorsTextElement.replaceChildren();
	}

	protected _updateErrors() {
		const newErrors: HTMLParagraphElement[] = []
		for (const key in this._errors) {
			if (!this._data[key]) {
				newErrors.push(createElement<HTMLParagraphElement>('p', {
					textContent: this._errors[key]
				}))
			}
		}
		this._errorsTextElement.replaceChildren(...newErrors);
		this._disableSubmitButton(newErrors.length !== 0);
	}

	public clearForm() {
		this._disableSubmitButton(true);
		this._clearErrors();
	}

	public get dataInputs() {
		return this._data;
	}
}

