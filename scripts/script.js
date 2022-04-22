const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popup.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__author-name');
const profileJob = document.querySelector('.profile__author-profession');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_about');
const formElement = popup.querySelector('.popup__form');

function togglePopup(event) { // открывает или закрыват попап
    if (!popup.classList.contains('popup_opened')) { //Если НЕ(!) имеется класс у попап 'popup_opened'(если popup закрыт) то:
        nameInput.value = profileName.textContent; // присваеваем инпуту значение Жак-Ив-Кусто
        jobInput.value = profileJob.textContent; // присваеваем второму инпуту исследователь  океана

    }
    popup.classList.toggle('popup_opened'); //добавляет, либо убирает класс 'popup_opened'(открывает или закрывает попап
}

function formSubmitHandler (event) {  //обрабатывает форму
    event.preventDefault() // отменяет стандартую отправку формы(т.к. не отправляем на сервер)
    profileName.textContent = nameInput.value  // присваиваем значение, введенное в форме имени значению информации имени на странице
    profileJob.textContent = jobInput.value // присваиваем значение, введенное в форме о себе значению информации о себе на странице
    popup.classList.toggle('popup_opened'); //закрываем попап
}
profileEditButton.addEventListener('click', togglePopup); //вешаем обработчик на кнопку "редактировать"(вызываем togglePopup)
profileCloseButton.addEventListener('click', togglePopup); // вешаем обработчик на кнопку "закрыть попап"(вызываем togglePopup)
formElement.addEventListener('submit', formSubmitHandler); // вешаем обработчик на кнопку "отправить"(вызываем formSubmitHandler)