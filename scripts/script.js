const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardList = document.querySelector('.elements__items');
const cardTemplate = document.querySelector('.template-card');
const profileName = document.querySelector('.profile__author-name');
const profileProfession = document.querySelector('.profile__author-profession');
const popupFormProfile = document.querySelector('.popup_type_profile');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = popupFormProfile.querySelector('.popup__button-close_type_profile');
const buttonOpenPopupCard = document.querySelector('.profile__add-button');
const formSubmitProfile = popupFormProfile.querySelector('.popup__form_type_profile');
const popupFormCard = document.querySelector('.popup_type_mesto')
const buttonClosePopupCard = popupFormCard.querySelector('.popup__button-close_type_card')
const formSubmitCard = popupFormCard.querySelector('.popup__form_type_mesto');
const popupZoomCard = document.querySelector('.popup_type_zoom');
const buttonCloseZoomPopup = popupZoomCard.querySelector('.popup__button-close_zoom');
const popupList = Array.from(document.querySelectorAll('.popup'));

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const classes = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
};



function createCard(name, link) {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector('.elements__image').alt = name;
    card.querySelector('.elements__image').src = link;
    card.querySelector('.elements__title').textContent = name;
    card.querySelector('.elements__button-like').addEventListener('click', likeCard);
    card.querySelector('.elements__button-basket').addEventListener('click', deleteCard);
    card.querySelector('.elements__image').addEventListener('click', increaseCardPopup);
    return card;
 }


 function renderCard(name,link) {
     cardList.prepend(createCard(name, link))
 }

initialCards.map(function (item){
    renderCard(item.name, item.link);
})

function openPopup(popup) {

    popup.classList.add('popup_opened');
    const inputList = Array.from(popup.querySelectorAll(classes.inputSelector));
    const buttonElement = popup.querySelector(classes.submitButtonSelector);
    if (buttonElement) {
        toggleButtonState(inputList, buttonElement);
    }
}

function closePopup(popup) {
    const formElement= popup.querySelector(classes.formSelector);
    const inputList = Array.from(popup.querySelectorAll(classes.inputSelector));
    if (formElement) {
        formElement.reset();
        inputList.forEach((inputElement) => {
            hideInputError(formElement,inputElement)
        })
    }
        popup.classList.remove('popup_opened');

}

function openProfilePopup() {
    popupFormProfile.querySelector('.popup__input_type_name').value = profileName.textContent;
    popupFormProfile.querySelector('.popup__input_type_about').value = profileProfession.textContent;
    openPopup(popupFormProfile);
}

function closeProfilePopup() {
    closePopup(popupFormProfile);
}

function popupFormSubmitProfile(event) {
    event.preventDefault();
    profileName.textContent = popupFormProfile.querySelector('.popup__input_type_name').value;
    profileProfession.textContent = popupFormProfile.querySelector('.popup__input_type_about').value;
    closePopup(popupFormProfile);
}

function OpenPopupFormCard(){
    openPopup(popupFormCard);
    popupFormCard.querySelector('.popup__input_type_name-card').value = '';
    popupFormCard.querySelector('.popup__input_type_link-card').value = '';
}

function closePopupFormCard() {
    closePopup(popupFormCard);
}



function addCard(event) {
    event.preventDefault();
    const name = popupFormCard.querySelector('.popup__input_type_name-card').value;
    const link = popupFormCard.querySelector('.popup__input_type_link-card').value;
    renderCard(name, link);
    closePopup(popupFormCard);
}

function likeCard(event) {
    event.target.classList.toggle('elements__button-like_active');
}

function  deleteCard(event) {
    event.target.closest('.elements__item').remove()
}

function increaseCardPopup(event) {
    openPopup(popupZoomCard);
    popupZoomCard.querySelector('.popup__image').src = event.target.src;
    popupZoomCard.querySelector('.popup__image-title').textContent = event.target.alt
}

function closeZoomCardPopup() {
    closePopup(popupZoomCard)
}

function addListenersPopups (popupList) {

    popupList.forEach((popupElement) => {
        popupElement.addEventListener('click', closeByPopup);
    })
}

function closeByPopup(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.currentTarget)
    }
}

function keyEscClosePopup(event) {
    if (event.key === 'Escape') {
        closePopup(popupFormProfile);
        closePopup(popupFormCard);
        closePopup(popupZoomCard);
    }

}

buttonOpenPopupProfile.addEventListener('click',openProfilePopup);
buttonClosePopupProfile.addEventListener('click',closeProfilePopup);
formSubmitProfile.addEventListener('submit', popupFormSubmitProfile);
buttonOpenPopupCard.addEventListener('click', OpenPopupFormCard);
buttonClosePopupCard.addEventListener('click', closePopupFormCard);
formSubmitCard.addEventListener('submit', addCard);
buttonCloseZoomPopup.addEventListener('click', closeZoomCardPopup);
document.addEventListener('keydown',keyEscClosePopup);


addListenersPopups(popupList)