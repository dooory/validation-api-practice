import "./style.css";

const formRequirements = {
    passwords: {
        minUppercase: 1,
        minNumbers: 1,
        minSpecialChar: 1,
    },
};

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

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

const minUppercaseRegex = new RegExp(
    `[A-Z]{${formRequirements.passwords.minUppercase},}`,
);

const minNumberRegex = new RegExp(
    `\\d{${formRequirements.passwords.minNumbers},}`,
);

const minSpecialCharacterRegex = new RegExp(
    `[!-/:-@[-\`{-~]{${formRequirements.passwords.minSpecialChar},}`,
);

const validatePassword = (event) => {
    const input = event.currentTarget;
    const validity = passwordInput.validity;
    const value = input.value;

    input.reportValidity();

    if (validity.valueMissing) {
        input.setCustomValidity("Please enter a password.");
    } else if (validity.tooShort) {
        input.setCustomValidity(
            `Passwords are required to be atleast ${input.minLength} characters long (currently ${input.value.length} ${
                input.value.length > 1 ? "characters" : "character"
            } long)`,
        );
    } else if (minUppercaseRegex.test(value) === false) {
        input.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minUppercase} uppercase ${
                formRequirements.passwords.minUppercase > 1 ?
                    "character"
                :   "characters"
            }.`,
        );
    } else if (minNumberRegex.test(value) === false) {
        input.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minNumbers} ${
                formRequirements.passwords.minNumbers > 1 ? "numbers" : "number"
            }.`,
        );
    } else if (minSpecialCharacterRegex.test(value) === false) {
        input.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minSpecialChar} special ${
                formRequirements.passwords.minSpecialChar > 1 ?
                    "characters"
                :   "character"
            } (such as ! or # )`,
        );
    } else {
        input.setCustomValidity("");
    }
};

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
