import { View } from "../../../components/View/base/View";

export interface InterfaceModal extends View<EnumModalEvents> {
	content: HTMLElement;
	open() : void;
	close() : void;
}

export enum EnumModalCSS {
	template = '#modal-container',
	closeButtonElement = '.modal__close',
	contentElement = '.modal__content',
	activeToggle = 'modal_active',
}

export enum EnumModalEvents {
	modalAddActiveClasslist = 'modal:addActiveClasslist',
	modalRemoveActiveClasslist = 'modal:removeActiveClasslist',
}
