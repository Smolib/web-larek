import { View } from './base/View';
import { ensureElement } from '../../utils/utils';
import {
	EnumSuccessCSS,
	EnumSuccessEvents,
	InterfaceSuccess,
} from '../../types/components/view/success';

export class Success extends View<EnumSuccessEvents> implements InterfaceSuccess {
	protected _totalPriceElement: HTMLElement;
	protected _closeButtonElement: HTMLElement;
	constructor(container: HTMLElement) {
		super(container);

		this._totalPriceElement = ensureElement<HTMLElement>(
			EnumSuccessCSS.totalPriceElement,
			this.container
		);
		this._closeButtonElement = ensureElement<HTMLElement>(
			EnumSuccessCSS.closeButtonElement,
			this.container
		);
		this._closeButtonElement.addEventListener('click', () => {
			this._emit(EnumSuccessEvents.closeButtonClick);
		});
	}

	set totalPrice(value: number) {
		this._totalPriceElement.textContent = `Списано ${value} синапсов`;
	}
}
