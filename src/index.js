import "./style.css";

const emailInput = document.getElementById("email");

const validateEmail = (event) => {
    const input = event.currentTarget;
    input.reportValidity();

    const validity = input.validity;

    if (validity.valueMissing) {
        input.setCustomValidity("Please enter an email.");
    } else if (validity.typeMismatch) {
        input.setCustomValidity("Please enter a valid email.");
    } else {
        input.setCustomValidity("");
    }
};

emailInput.addEventListener("input", validateEmail);
