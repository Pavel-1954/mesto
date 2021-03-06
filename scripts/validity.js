const showInputError = (formElement, inputElement, errorMessage, ) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active')
}

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
}

const checkInputValidity = (formElement, inputElement) => {
    if (!isValidity(inputElement)) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError (formElement, inputElement)
    }
}

const isValidity = (inputElement) => {
    return inputElement.validity.valid;
}

const toggleButtonState = (inputList, buttonElement, ) => {
    console.log(buttonElement.classList)
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__save-button_inactive')
        buttonElement.setAttribute('disabled', true)
    } else {
        buttonElement.classList.remove('popup__save-button_inactive');
        buttonElement.removeAttribute('disabled')
    }
}

const hasInvalidInput = (inputList) => {
    return inputList.some(function (inputElement) {
        return !isValidity(inputElement)
    })
}
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__save-button');
    console.log(buttonElement)
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        })
    })
}
 const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    console.log(formList)
    const buttonSubmitList = Array.from(document.querySelectorAll('.popup__save-button'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault()
        });
            setEventListeners(formElement);
    });
}

enableValidation()