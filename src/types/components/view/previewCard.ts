import { View } from "../../../components/View/base/View";
import { TypeViewProductData } from "./base/view";

export interface InterfacePreviewCard extends View<EnumPreviewCardEvents> {
	buttonText: string;
	item: TypeViewProductData;
}

export enum EnumPreviewCardCSS {
	template = '#card-preview',
	titleElement = '.card__title',
	priceElement = '.card__price',
	categoryElement = '.card__category',
	buttonElement = '.card__button',
	imageElement = '.card__image',
	descriptionElement = '.card__text',
}

export enum EnumPreviewCardButtonText {
	addItemToBasket = 'В корзину',
	removeItemFromBasket = 'Удалить из корзины',
}

export enum EnumPreviewCardEvents {
	buttonClick = 'button:click'
}

export enum EnumPreviewCardCategoriesCSS {
	"софт-скил" = "card__category_soft",
	"хард-скил" = "card__category_hard",
	"дополнительное" = "card__category_additional",
	"другое" = "card__category_other",
	"кнопка" = "card__category_button"
}

export type TypePreviewCardCategoriesName = keyof typeof EnumPreviewCardCategoriesCSS;