import { ensureElement } from '../../utils/utils';
import { View } from './base/View';
import {
	EnumPreviewCardEvents,
	EnumPreviewCardCSS,
	EnumPreviewCardCategoriesCSS,
} from '../../types/components/view/previewCard';
import { TypeViewProductData } from '../../types/components/view/base/view';

export class PreviewCard extends View<EnumPreviewCardEvents> {
	protected _titleElement: HTMLElement;
	protected _priceElement: HTMLElement;
	protected _imageElement: HTMLImageElement;
	protected _descriptionElement: HTMLElement;
	protected _categoryElement: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
	protected _item: TypeViewProductData;

	constructor(container: HTMLElement) {
		super(container);

		this._titleElement = ensureElement<HTMLElement>(
			EnumPreviewCardCSS.titleElement,
			container
		);
		this._priceElement = ensureElement<HTMLElement>(
			EnumPreviewCardCSS.priceElement,
			container
		);
		this._categoryElement = ensureElement(
			EnumPreviewCardCSS.categoryElement,
			container
		);
		this._buttonElement = ensureElement<HTMLButtonElement>(
			EnumPreviewCardCSS.buttonElement,
			container
		);
		this._imageElement = ensureElement<HTMLImageElement>(
			EnumPreviewCardCSS.imageElement,
			container
		);
		this._descriptionElement = ensureElement<HTMLElement>(
			EnumPreviewCardCSS.descriptionElement,
			container
		);
		this._buttonElement.addEventListener('click', () => {
			this._emit(EnumPreviewCardEvents.buttonClick, this._item);
		});
	}

	public set buttonText(text: string) {
		this._buttonElement.textContent = text;
	}

	public set item(data: TypeViewProductData) {
		this._item = data;
		const { title, price, description, image, category } = data;
		this._titleElement.textContent = title;
		this._priceElement.textContent = price ? `${price} синапсов` : 'Бесценно';
		this._buttonElement.disabled = !price;
		this._descriptionElement.textContent = description;
		this._imageElement.src = image;
		this._imageElement.alt = title;
		this._categoryElement.textContent = category;
		this._categoryElement.classList.add(EnumPreviewCardCategoriesCSS[category]);
	}
}
