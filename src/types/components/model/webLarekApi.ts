type TypeApiPaymentMethod = 'cash' | 'online';
type TypeApiProductCategory = "софт-скил" | "хард-скил" | "дополнительное" | "другое" | "кнопка";

export interface InterfaceWebLarekAPI {
	getProductList(): Promise<TypeApiGetProduct[]>;
	postOrderProducts(order: TypeApiPostOrder): Promise<TypeApiResponsePostOrder>
}

export type TypeApiGetListOfProducts<Type> = {
	total: number;
	items: Type[];
};

export type TypeApiGetProduct = {
	id: string;
	description: string;
	image: string;
	title: string;
	category: TypeApiProductCategory;
	price: number | null;
};

export type TypeApiPostOrder = {
	payment: TypeApiPaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
};

export type TypeApiResponsePostOrder = {
	id: string;
	total: number;
};