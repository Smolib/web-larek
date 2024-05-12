import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { WebLarekAPI } from './components/Model/WebLarekAPI';
import { Basket } from './components/View/Basket';
import { Page } from './components/View/Page';
import { Modal } from './components/View/Modal';
import { Model } from './components/Model/Model';
import { DeliveryForm } from './components/View/DeliveryForm';
import { ContactsForm } from './components/View/ContactsForm';
import { Presenter } from './components/Presenter/Presenter';
import { Success } from './components/View/Success';
import { PreviewCard } from './components/View/PreviewCard';
import { EnumModalCSS } from './types/components/view/modal';
import { EnumDeliveryFormCSS } from './types/components/view/deliveryForm';
import { EnumContactsFormCSS } from './types/components/view/contactsForm';
import { EnumBasketCSS } from './types/components/view/basket';
import { EnumSuccessCSS } from './types/components/view/success';
import { EnumPreviewCardCSS } from './types/components/view/previewCard';

const api = new WebLarekAPI(CDN_URL, API_URL);
const model = new Model(api);

const modalTemplate = ensureElement<HTMLElement>(EnumModalCSS.template);
const deliveryFormTemplate = cloneTemplate<HTMLFormElement>(
	ensureElement<HTMLTemplateElement>(EnumDeliveryFormCSS.template)
);
const contactsFormTemplate = cloneTemplate<HTMLFormElement>(
	ensureElement<HTMLTemplateElement>(EnumContactsFormCSS.template)
);
const basketTemplate = cloneTemplate(
	ensureElement<HTMLTemplateElement>(EnumBasketCSS.template)
);
const successTemplate = cloneTemplate(
	ensureElement<HTMLTemplateElement>(EnumSuccessCSS.template)
);
const cardPreviewTemplate = cloneTemplate(
	ensureElement<HTMLTemplateElement>(EnumPreviewCardCSS.template)
);

const page = new Page(document.body);
const modal = new Modal(modalTemplate);
const deliveryForm = new DeliveryForm(deliveryFormTemplate);
const contactsForm = new ContactsForm(contactsFormTemplate);
const basket = new Basket(basketTemplate);
const success = new Success(successTemplate);
const previewCard = new PreviewCard(cardPreviewTemplate);

new Presenter(model, {
	page,
	modal,
	deliveryForm,
	contactsForm,
	basket,
	success,
	previewCard,
});
