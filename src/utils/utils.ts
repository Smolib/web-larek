import { EnumApiMethods, InterfaceApi, SelectorCollection, SelectorElement } from '../types/utils';

export function ensureElement<T extends HTMLElement>(
	selectorElement: SelectorElement<T>,
	context?: HTMLElement
): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context);
		if (elements.length > 1) {
			console.warn(`selector ${selectorElement} return more then one element`);
		}
		if (elements.length === 0) {
			throw new Error(`selector ${selectorElement} return nothing`);
		}
		return elements.pop() as T;
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement as T;
	}
	throw new Error('Unknown selector element');
}

export function isSelector<T>(x: string | T): x is string {
	return typeof x === 'string' && x.length > 1;
}

export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document as unknown as HTMLElement
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement)) as T[];
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[];
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement;
	}
	throw new Error(`Unknown selector element`);
}

export function createElement<T extends HTMLElement>(
	tagName: keyof HTMLElementTagNameMap,
	props?: Partial<Record<keyof T, string | boolean | object>>,
	children?: HTMLElement | HTMLElement[]
): T {
	const element = document.createElement(tagName) as T;
	if (props) {
		for (const key in props) {
			const value = props[key];
			if (isPlainObject(value) && key === 'dataset') {
				setElementData(element, value);
			} else {
				// @ts-expect-error fix indexing later
				element[key] = isBoolean(value) ? value : String(value);
			}
		}
	}
	if (children) {
		for (const child of Array.isArray(children) ? children : [children]) {
			element.append(child);
		}
	}
	return element;
}

export function cloneTemplate<T extends HTMLElement>(
	query: string | HTMLTemplateElement
): T {
	const template = ensureElement(query) as HTMLTemplateElement;
	return template.content.firstElementChild.cloneNode(true) as T;
}

export function setElementData<T extends Record<string, unknown> | object>(
	el: HTMLElement,
	data: T
) {
	for (const key in data) {
		el.dataset[key] = String(data[key]);
	}
}

export function isPlainObject(obj: unknown): obj is object {
	const prototype = Object.getPrototypeOf(obj);
	return prototype === Object.getPrototypeOf({}) || prototype === null;
}

export function isBoolean(v: unknown): v is boolean {
	return typeof v === 'boolean';
}

export class Api implements InterfaceApi {
	readonly baseUrl: string;
	protected _options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this._options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	protected _handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else
			return response
				.json()
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	get(uri: string, method = EnumApiMethods.GET) {
		return fetch(this.baseUrl + uri, {
			...this._options,
			method,
		}).then(this._handleResponse);
	}

	post(uri: string, data: object, method = EnumApiMethods.POST) {
		return fetch(this.baseUrl + uri, {
			...this._options,
			method,
			body: JSON.stringify(data),
		}).then(this._handleResponse);
	}
}
