const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = popup.querySelector('.popup__button-close');
const profileName = document.querySelector('.profile__author-name');
const profileJob = document.querySelector('.profile__author-profession');
const nameInput = popup.querySelector('.popup__input_type_name');
const jobInput = popup.querySelector('.popup__input_type_about');
const formElement = popup.querySelector('.popup__form');
function togglePopup(event) {
    if (!popup.classList.contains('popup_opened')) {
        nameInput.value = profileName.textContent;
        jobInput.value = profileJob.textContent;
        console.log(nameInput)
        console.log(jobInput)
    }
    popup.classList.toggle('popup_opened');
}
function formSubmitHandler (event) {
    event.preventDefault()
    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value
    popup.classList.toggle('popup_opened');
}
profileEditButton.addEventListener('click', togglePopup);
profileCloseButton.addEventListener('click', togglePopup);
formElement.addEventListener('submit', formSubmitHandler);