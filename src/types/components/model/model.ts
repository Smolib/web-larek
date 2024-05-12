import { TypeApiResponsePostOrder } from "./webLarekApi";

export interface InterfaceModel {
	addListener<T extends object>(eventName: EnumModelEvents,
		callback: (event: T) => void): void;

	products: TypeModelProductData[];
	basketData: TypeModelBasketData;

	postOrderProducts(data: TypeModelOrderData): Promise<void | TypeApiResponsePostOrder>;
	isItemInBasket(item: TypeModelProductData): boolean;
	addItemToBasket(item: TypeModelProductData): void;
	removeItemFromBasket(item: TypeModelProductData): void;
}

type TypeModelProductCategory =
	| 'софт-скил'
	| 'хард-скил'
	| 'дополнительное'
	| 'другое'
	| 'кнопка';
type TypeModelPaymentMethod = 'cash' | 'online';

export type TypeModelProductData = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: TypeModelProductCategory;
	price: number | null;
};

export type TypeModelBasketData = {
	items: string[];
	total: number;
};

export enum EnumModelEvents {
	basketChange = 'basket:change',
	itemsChange = 'items:change',
}

export type TypeModelEventName = string;

export type TypeModelSubscriber = (...args: object[]) => void;

export type TypeModelOrderData = {
	payment: TypeModelPaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
};
