const form = document.querySelector(".sign_up-form");
const fullName = document.querySelector("#name");
const fullNameError = document.querySelector("#fullNameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const address = document.querySelector("#address");
const addressError = document.querySelector("#addressError");
const messageSuccess = document.querySelector(".messageSuccess");

function validateForm () {
    event.preventDefault();
    if(checkLength(fullName.value, 0) === true) {
        fullNameError.style.display = "none";
    } else {
        fullNameError.style.display = "block";
    }

    if(checkLength(address.value, 15) === true){
        addressError.style.display = "none";
    } else {
        addressError.style.display = "block";
    }

    if(validateEmail(email.value) === true) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if((checkLength(fullName.value, 0) === true) & (checkLength(address.value, 15) === true) & (validateEmail(email.value))) {
        messageSuccess.innerHTML = `<h2>Form successfully submitted!!</h2>`;
    } else {
        messageSuccess.style.display = "none";
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if(value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

