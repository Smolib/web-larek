import { View } from './base/View';
import { ensureElement } from '../../utils/utils';
import { EnumModalCSS, EnumModalEvents, InterfaceModal } from '../../types/components/view/modal';

export class Modal extends View<EnumModalEvents> implements InterfaceModal {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			EnumModalCSS.closeButtonElement,
			container
		);
		this._content = ensureElement<HTMLElement>(EnumModalCSS.contentElement, container);

		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	public open() {
		this.container.classList.add(EnumModalCSS.activeToggle);
		this._emit(EnumModalEvents.modalAddActiveClasslist);
	}

	public close() {
		this.container.classList.remove(EnumModalCSS.activeToggle);
		this.content = null;
		this._emit(EnumModalEvents.modalRemoveActiveClasslist);
	}
}
