export interface InterfaceView<EventNames extends string> {
	addListener<T extends object>(eventName: EventNames,
		callback: (event: T) => void): void;
	container: HTMLElement;
}

export type TypeViewEventName = string;

type TypeViewProductCategory = "софт-скил" | "хард-скил" | "дополнительное" | "другое" | "кнопка";

export type TypeViewSubscriber = (...args: object[]) => void;

export type TypeViewProductData = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: TypeViewProductCategory;
	price: number | null;
}