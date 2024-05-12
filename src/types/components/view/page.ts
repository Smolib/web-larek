import { CatalogCard } from "../../../components/View/CatalogCard";
import { View } from "../../../components/View/base/View";
import { TypeViewProductData } from "./base/view";

export interface InterfacePage extends View<EnumPageEvents> {
	counterItemsInBasket: number;
	catalog: TypeViewProductData[];
	viewCards: { card: CatalogCard, data: TypeViewProductData }[];
	lockedPage: boolean;
}

export enum EnumPageCSS {
	counterElement = '.header__basket-counter',
	catalogElement = '.gallery',
	wrapperElement = '.page__wrapper',
	basketElement = '.header__basket',
	lockedToggle = 'page__wrapper_locked',
}

export enum EnumPageEvents {
	basketButtonClick = 'basketButton:click',
}