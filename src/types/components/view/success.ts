import { View } from "../../../components/View/base/View";

export interface InterfaceSuccess extends View<EnumSuccessEvents> {
	totalPrice: number;
}

export enum EnumSuccessCSS {
	template = '#success',
	totalPriceElement = '.order-success__description',
	closeButtonElement = '.order-success__close',
}

export enum EnumSuccessEvents {
	closeButtonClick = 'closeButton:click'
}
