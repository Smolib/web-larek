import { InterfaceView } from "./base/view";

export interface InterfaceCatalogCard extends InterfaceView<EnumCatalogCardEvents> {
}

export enum EnumCatalogCardCSS {
	template = '#card-catalog',
	titleElement = '.card__title',
	priceElement = '.card__price',
	buttonElement = '.card__button',
	categoryElement = '.card__category',
	imageElement = '.card__image',
	descriptionElement = '.card__text',
}

export enum EnumCatalogCardCategoriesCSS {
	"софт-скил" = "card__category_soft",
	"хард-скил" = "card__category_hard",
	"дополнительное" = "card__category_additional",
	"другое" = "card__category_other",
	"кнопка" = "card__category_button"
} 

export type TypeCatalogCardCategoriesName = keyof typeof EnumCatalogCardCategoriesCSS;


export enum EnumCatalogCardEvents {
	cardClick = 'card:click'
}

export type TypeCatalogCardData = {
	title: string;
	price: number | null;
	image: string;
	category: TypeCatalogCardCategoriesName;
}
