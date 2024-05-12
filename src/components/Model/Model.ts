import {
	EnumModelEvents,
	TypeModelBasketData,
	TypeModelEventName,
	TypeModelOrderData,
	TypeModelSubscriber,
	TypeModelProductData,
	InterfaceModel,
} from '../../types/components/model/model';

import { WebLarekAPI } from './WebLarekAPI';

export class Model implements InterfaceModel {
	protected _events: Map<TypeModelEventName, Set<TypeModelSubscriber>>;
	protected _api: WebLarekAPI;
	protected _products: TypeModelProductData[];
	protected _basketData: TypeModelBasketData;

	constructor(api: WebLarekAPI) {
		this._api = api;
		api
			.getProductList()
			.then(this._setItems.bind(this))
			.catch((err) => {
				console.error(err);
			});

		this._events = new Map<TypeModelEventName, Set<TypeModelSubscriber>>();
		this._products = [];
		this._basketData = {
			items: [],
			total: 0,
		};
	}

	public addListener<T extends object>(
		eventName: EnumModelEvents,
		callback: (event: T) => void
	) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<TypeModelSubscriber>());
		}
		this._events.get(eventName)?.add(callback);
	}

	protected _emit<T extends object>(eventName: string, data?: T) {
		this._events.forEach((subscribers, name) => {
			if (name === eventName) {
				subscribers.forEach((callback) => callback(data));
			}
		});
	}

	protected _setItems(items: TypeModelProductData[]) {
		this._products = items;
		this._emit(EnumModelEvents.itemsChange, this._products);
	}

	protected _clearBasket() {
		this._basketData.items = [];
		this._basketData.total = 0;
		this._emit(EnumModelEvents.basketChange, this._basketData);
	}

	get products() {
		return this._products;
	}

	get basketData() {
		return this._basketData;
	}
	public postOrderProducts(data: TypeModelOrderData) {
		return this._api
			.postOrderProducts(data)
			.then((result) => {
				this._clearBasket();
				return result;
			})
			.catch((err) => {
				console.error(err);
			});
	}

	public isItemInBasket(item: TypeModelProductData): boolean {
		return this._basketData.items.includes(item.id);
	}

	public addItemToBasket(item: TypeModelProductData) {
		this._basketData.items.push(item.id);
		this._basketData.total += item.price;
		this._emit(EnumModelEvents.basketChange, this._basketData);
	}

	public removeItemFromBasket(item: TypeModelProductData) {
		this._basketData.items = this._basketData.items.filter(
			(id) => id !== item.id
		);
		this._basketData.total -= item.price;
		this._emit(EnumModelEvents.basketChange, this._basketData);
	}
}
