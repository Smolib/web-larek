import { InterfaceView } from "./base/view";

export interface InterfaceBasketCard extends InterfaceView<EnumBasketCardEvents> {
}

export enum EnumBasketCardCSS {
	template = '#card-basket',
	titleElement = '.card__title',
	priceElement = '.card__price',
	categoryElement = '.card__category',
	deleteButtonElement = '.card__button',
	indexElement = ".basket__item-index"
}

export enum EnumBasketCardEvents {
	deleteButtonClick = 'deleteButton:click'
}

export type TypeBasketCardData = {
	title: string;
	price: number | null;
	index: number
};
