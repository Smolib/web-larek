import {
	EnumCatalogCardCSS,
	EnumCatalogCardCategoriesCSS,
	EnumCatalogCardEvents,
	InterfaceCatalogCard,
	TypeCatalogCardData,
} from '../../types/components/view/catalogCard';
import { ensureElement } from '../../utils/utils';
import { View } from './base/View';

export class CatalogCard extends View<EnumCatalogCardEvents> implements InterfaceCatalogCard {
	protected _titleElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _imageElement: HTMLImageElement;
	protected _descriptionElement: HTMLElement;
	protected _categoryElement: HTMLElement;

	constructor(
		container: HTMLElement,
		{ title, price, image, category }: TypeCatalogCardData
	) {
		super(container);

		this._titleElement = ensureElement<HTMLElement>(
			EnumCatalogCardCSS.titleElement,
			container
		);
		this._priceElement = ensureElement<HTMLElement>(
			EnumCatalogCardCSS.priceElement,
			container
		);
		this._categoryElement = ensureElement<HTMLElement>(
			EnumCatalogCardCSS.categoryElement,
			container
		);
		this._imageElement = ensureElement<HTMLImageElement>(
			EnumCatalogCardCSS.imageElement,
			container
		);

		this._titleElement.textContent = title;
		this._priceElement.textContent = price ? `${price} синапсов` : 'Бесценно';
		this._imageElement.src = image;
		this._imageElement.alt = title;
		this._categoryElement.textContent = category;
		this._categoryElement.classList.add(EnumCatalogCardCategoriesCSS[category]);

		this.container.addEventListener('click', () => {
			this._emit(EnumCatalogCardEvents.cardClick);
		});
	}
}
