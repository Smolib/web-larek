import {
	EnumBasketCardCSS,
	EnumBasketCardEvents,
	InterfaceBasketCard,
	TypeBasketCardData,
} from '../../types/components/view/basketCard';
import { ensureElement } from '../../utils/utils';
import { View } from './base/View';

export class BasketCard extends View<EnumBasketCardEvents> implements InterfaceBasketCard {
	protected _titleElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _deleteButtonElement: HTMLButtonElement;
	protected _indexElement: HTMLElement;

	constructor(
		container: HTMLElement,
		{ title, price, index }: TypeBasketCardData
	) {
		super(container);
		this._titleElement = ensureElement<HTMLElement>(
			EnumBasketCardCSS.titleElement,
			container
		);
		this._priceElement = ensureElement<HTMLElement>(
			EnumBasketCardCSS.priceElement,
			container
		);
		this._deleteButtonElement = ensureElement<HTMLButtonElement>(
			EnumBasketCardCSS.deleteButtonElement,
			container
		);
		this._indexElement = ensureElement<HTMLElement>(
			EnumBasketCardCSS.indexElement,
			container
		);

		this._titleElement.textContent = title;
		this._priceElement.textContent = price ? `${price} синапсов` : 'Бесценно';
		this._indexElement.textContent = String(index);

		this._deleteButtonElement.addEventListener('click', () => {
			this._emit(EnumBasketCardEvents.deleteButtonClick);
		});
	}
}
