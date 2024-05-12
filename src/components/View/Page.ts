import { View } from './base/View';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { EnumPageCSS, EnumPageEvents, InterfacePage } from '../../types/components/view/page';
import { CatalogCard } from './CatalogCard';
import { EnumCatalogCardCSS } from '../../types/components/view/catalogCard';
import { TypeViewProductData } from '../../types/components/view/base/view';

const catalogCardTemplate = ensureElement<HTMLTemplateElement>(
	EnumCatalogCardCSS.template
);

export class Page extends View<EnumPageEvents> implements InterfacePage {
	protected _counterItemsInBasketElement: HTMLElement;
	protected _catalogElement: HTMLElement;
	protected _wrapperElement: HTMLElement;
	protected _basketElement: HTMLElement;
	protected _viewCards: { card: CatalogCard, data: TypeViewProductData }[];


	constructor(container: HTMLElement) {
		super(container);

		this._counterItemsInBasketElement = ensureElement<HTMLElement>(EnumPageCSS.counterElement);
		this._catalogElement = ensureElement<HTMLElement>(EnumPageCSS.catalogElement);
		this._wrapperElement = ensureElement<HTMLElement>(EnumPageCSS.wrapperElement);
		this._basketElement = ensureElement<HTMLElement>(EnumPageCSS.basketElement);
		this._basketElement.addEventListener('click', () => {
			this._emit(EnumPageEvents.basketButtonClick);
		});

		this._counterItemsInBasketElement.textContent = "0";
	}

	public set counterItemsInBasket(value: number) {
		this._counterItemsInBasketElement.textContent = String(value);
	}

	public set catalog (items: TypeViewProductData[]) {
		const cardsElements: HTMLElement[] = [];
		const viewCards: { card: CatalogCard; data: TypeViewProductData; }[] = []
		items.map((item) => {
			const newCard = new CatalogCard(cloneTemplate(catalogCardTemplate), item);
			viewCards.push({ card: newCard, data: item });
			cardsElements.push(newCard.container);
		})
		this._catalogElement.replaceChildren(...cardsElements);
		this._viewCards = viewCards;
	}

	public get viewCards() {
		return this._viewCards;
	}

	public set lockedPage(value: boolean) {
		if (value) {
			this._wrapperElement.classList.add(EnumPageCSS.lockedToggle);
		} else {
			this._wrapperElement.classList.remove(EnumPageCSS.lockedToggle);
		}
	}
}
