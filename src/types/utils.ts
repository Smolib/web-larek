export type SelectorElement<T> = T | string;
export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export interface InterfaceApi {
	baseUrl: string;
	get(uri: string, method?: EnumApiMethods): Promise<object>;
	post(uri: string, data: object, method?: EnumApiMethods): Promise<object>;
}

export enum EnumApiMethods {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
	GET = 'GET',
}
