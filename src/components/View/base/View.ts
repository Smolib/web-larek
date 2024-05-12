import {
	InterfaceView,
	TypeViewEventName,
	TypeViewSubscriber,
} from '../../../types/components/view/base/view';

export abstract class View<EventNames extends string> implements InterfaceView<EventNames>{

	protected _events: Map<TypeViewEventName, Set<TypeViewSubscriber>>;
	protected _container: HTMLElement;

	constructor(container: HTMLElement) {
		this._container = container;
		this._events = new Map<TypeViewEventName, Set<TypeViewSubscriber>>();
	}

	public addListener<T extends object>(
		eventName: EventNames,
		callback: (event: T) => void
	) {
		if (!this._events.has(eventName)) {
			this._events.set(eventName, new Set<TypeViewSubscriber>());
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

	get container () {
		return this._container;
	}
}
