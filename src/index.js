import "./style.css";

const emailInput = document.getElementById("email");

const validateEmail = () => {
    emailInput.reportValidity();

    const validity = emailInput.validity;

    if (validity.valueMissing) {
        emailInput.setCustomValidity("Please enter an email.");
    } else if (validity.typeMismatch) {
        emailInput.setCustomValidity("Please enter a valid email.");
    } else {
        emailInput.setCustomValidity("");
    }
};

emailInput.addEventListener("blur", validateEmail);
