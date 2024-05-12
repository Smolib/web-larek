import {
	InterfaceWebLarekAPI,
	TypeApiGetListOfProducts,
	TypeApiGetProduct,
	TypeApiPostOrder,
	TypeApiResponsePostOrder,
} from '../../types/components/model/webLarekApi';

import { Api } from '../../utils/utils';

export class WebLarekAPI implements InterfaceWebLarekAPI {
	protected _cdn: string;
	protected _api: Api;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		this._api = new Api(baseUrl, options);
		this._cdn = cdn;
	}

	public getProductList(): Promise<TypeApiGetProduct[]> {
		return this._api
			.get('/product')
			.then((data: TypeApiGetListOfProducts<TypeApiGetProduct>) =>
				data.items.map((item) => ({
					...item,
					image: this._cdn + item.image,
				}))
			);
	}

	public postOrderProducts(
		order: TypeApiPostOrder
	): Promise<TypeApiResponsePostOrder> {
		return this._api
			.post('/order', order)
			.then((data: TypeApiResponsePostOrder) => data);
	}
}
