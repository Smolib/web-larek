import { Model } from '../Model/Model';
import { Success } from '../View/Success';
import { TypeApiResponsePostOrder } from '../../types/components/model/webLarekApi';
import { EnumBasketEvents } from '../../types/components/view/basket';
import { EnumFormEvents } from '../../types/components/view/base/form';
import { EnumModalEvents } from '../../types/components/view/modal';
import { EnumPageEvents } from '../../types/components/view/page';
import { EnumModelEvents } from '../../types/components/model/model';
import { ContactsForm } from '../View/ContactsForm';
import { Modal } from '../View/Modal';
import { Page } from '../View/Page';
import { Basket } from '../View/Basket';
import { DeliveryForm } from '../View/DeliveryForm';
import { EnumSuccessEvents } from '../../types/components/view/success';
import { EnumBasketCardEvents } from '../../types/components/view/basketCard';
import { PreviewCard } from '../View/PreviewCard';
import { EnumCatalogCardEvents } from '../../types/components/view/catalogCard';
import {
	EnumPreviewCardButtonText,
	EnumPreviewCardEvents,
} from '../../types/components/view/previewCard';
import { TypeViewProductData } from '../../types/components/view/base/view';

export class Presenter {
	constructor(
		model: Model,
		{
			page,
			modal,
			deliveryForm,
			contactsForm,
			basket,
			success,
			previewCard,
		}: {
			page: Page;
			modal: Modal;
			deliveryForm: DeliveryForm;
			contactsForm: ContactsForm;
			basket: Basket;
			success: Success;
			previewCard: PreviewCard;
		}
	) {
		// Слушатели model

		model.addListener(
			EnumModelEvents.itemsChange,
			(items: TypeViewProductData[]) => {
				page.catalog = items;
				page.viewCards.map((item) => {
					item.card.addListener(EnumCatalogCardEvents.cardClick, () => {
						if (item) {
							previewCard.item = item.data;
							previewCard.buttonText = model.isItemInBasket(item.data)
								? EnumPreviewCardButtonText.removeItemFromBasket
								: EnumPreviewCardButtonText.addItemToBasket;
							(modal.content = previewCard.container), modal.open();
						} else {
							modal.close();
						}
					});
				});
			}
		);

		model.addListener(EnumModelEvents.basketChange, () => {
			page.counterItemsInBasket = model.basketData.items.length;
			const basketItems: TypeViewProductData[] = [];
			model.basketData.items.map((id) => {
				const item = model.products.find((item) => item.id === id);
				basketItems.push(item);
			});
			basket.totalPrice = model.basketData.total;
			basket.setItemsList(basketItems);
			basket.viewCards.map((item) => {
				item.card.addListener(EnumBasketCardEvents.deleteButtonClick, () => {
					model.removeItemFromBasket(item.data!);
				});
			});
		});
		// Слушатели page

		page.addListener(EnumPageEvents.basketButtonClick, () => {
			(modal.content = basket.container), modal.open();
		});

		// Слушатели modal

		modal.addListener(EnumModalEvents.modalAddActiveClasslist, () => {
			page.lockedPage = true;
		});

		modal.addListener(EnumModalEvents.modalRemoveActiveClasslist, () => {
			page.lockedPage = false;
		});

		// Слушатели previewCard

		previewCard.addListener(
			EnumPreviewCardEvents.buttonClick,
			(item: TypeViewProductData) => {
				if (model.isItemInBasket(item)) {
					model.removeItemFromBasket(item);
					previewCard.buttonText = EnumPreviewCardButtonText.addItemToBasket;
				} else {
					model.addItemToBasket(item);
					previewCard.buttonText =
						EnumPreviewCardButtonText.removeItemFromBasket;
				}
			}
		);

		//Слушатели basket

		basket.addListener(EnumBasketEvents.nextButtonClick, () => {
			modal.content = deliveryForm.container;
		});

		//Слушатели deliveryForm

		deliveryForm.addListener(EnumFormEvents.formSubmit, () => {
			modal.content = contactsForm.container;
		});

		//Слушатели contactsForm

		contactsForm.addListener(EnumFormEvents.formSubmit, () => {
			const newOrder = Object.assign(
				contactsForm.dataInputs,
				deliveryForm.dataInputs,
				model.basketData
			);
			model
				.postOrderProducts(newOrder)
				.then((result: TypeApiResponsePostOrder) => {
					success.totalPrice = result.total;
					modal.content = success.container;
					contactsForm.clearForm();
					deliveryForm.clearForm();
				});
		});

		// Слушатели success

		success.addListener(EnumSuccessEvents.closeButtonClick, () => {
			modal.close();
		});
	}
}
