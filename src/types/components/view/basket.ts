import { InterfaceView, TypeViewProductData } from "./base/view";
import { InterfaceBasketCard } from "./basketCard";

export interface InterfaceBasket extends InterfaceView<EnumBasketEvents> {
	setItemsList(items: TypeViewProductData[]): void;
	viewCards: { card: InterfaceBasketCard; data: TypeViewProductData }[];
	totalPrice: number;
}

export enum EnumBasketCSS {
	template = '#basket',
	listElement = '.basket__list',
	totalPriceElement = '.basket__price',
	buttonElement = '.basket__button',
}

export enum EnumBasketEvents {
	nextButtonClick = 'nextButton:click'
}
