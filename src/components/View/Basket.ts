import {
	EnumBasketCSS,
	EnumBasketEvents,
	InterfaceBasket,
} from '../../types/components/view/basket';
import { cloneTemplate, createElement, ensureElement } from '../../utils/utils';
import { View } from './base/View';
import { EnumBasketCardCSS } from '../../types/components/view/basketCard';
import { BasketCard } from './BasketCard';
import { TypeViewProductData } from '../../types/components/view/base/view';

export class Basket extends View<EnumBasketEvents> implements InterfaceBasket {
	protected _listElement: HTMLElement;
	protected _totalPriceElement: HTMLElement;
	protected _buttonElement: HTMLElement;
	private _viewCards: { card: BasketCard; data: TypeViewProductData }[];
	private _basketCardTemplate: HTMLTemplateElement;

	constructor(container: HTMLElement) {
		super(container);

		this._basketCardTemplate = ensureElement<HTMLTemplateElement>(
			EnumBasketCardCSS.template
		);

		this._listElement = ensureElement<HTMLElement>(
			EnumBasketCSS.listElement,
			this.container
		);
		this._totalPriceElement = ensureElement<HTMLElement>(
			EnumBasketCSS.totalPriceElement,
			this.container
		);
		this._buttonElement = ensureElement<HTMLElement>(
			EnumBasketCSS.buttonElement,
			this.container
		);

		this._buttonElement.addEventListener('click', () => {
			this._emit(EnumBasketEvents.nextButtonClick);
		});
	}

	public setItemsList(items: TypeViewProductData[]) {
		const cardsElements: HTMLElement[] = [];
		const viewCards: { card: BasketCard; data: TypeViewProductData }[] = [];
		items.map((item, i) => {
			const index = ++i;
			const newCard = new BasketCard(cloneTemplate(this._basketCardTemplate), {
				...item,
				index,
			});
			viewCards.push({ card: newCard, data: item });
			cardsElements.push(newCard.container);
		});
		this._viewCards = viewCards;

		if (items.length) {
			this._listElement.replaceChildren(...cardsElements);
			this._buttonElement.removeAttribute('disabled');
		} else {
			this._listElement.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this._buttonElement.setAttribute('disabled', 'disabled');
		}
	}

	public get viewCards() {
		return this._viewCards;
	}

	public set totalPrice(price: number) {
		this._totalPriceElement.textContent = `${price} синапсов`;
	}
}
