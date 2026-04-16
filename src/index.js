import "./style.css";

import { validatePostalCode, getAllCountries } from "postal-code-checker";

const formRequirements = {
    passwords: {
        minUppercase: 1,
        minNumbers: 1,
        minSpecialChar: 1,
    },
};

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const countryInput = document.getElementById("country");
const postcodeInput = document.getElementById("postcode");

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

const minUppercaseRegex = new RegExp(
    `[A-Z]{${formRequirements.passwords.minUppercase},}`,
);

const minNumberRegex = new RegExp(
    `\\d{${formRequirements.passwords.minNumbers},}`,
);

const minSpecialCharacterRegex = new RegExp(
    `[!-/:-@[-\`{-~]{${formRequirements.passwords.minSpecialChar},}`,
);

const validatePassword = () => {
    const validity = passwordInput.validity;
    const value = passwordInput.value;

    passwordInput.reportValidity();

    if (validity.valueMissing) {
        passwordInput.setCustomValidity("Please enter a password.");
    } else if (validity.tooShort) {
        passwordInput.setCustomValidity(
            `Passwords are required to be atleast ${passwordInput.minLength} characters long (currently ${passwordInput.value.length} ${
                passwordInput.value.length > 1 ? "characters" : "character"
            } long)`,
        );
    } else if (minUppercaseRegex.test(value) === false) {
        passwordInput.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minUppercase} uppercase ${
                formRequirements.passwords.minUppercase > 1 ?
                    "character"
                :   "characters"
            }.`,
        );
    } else if (minNumberRegex.test(value) === false) {
        passwordInput.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minNumbers} ${
                formRequirements.passwords.minNumbers > 1 ? "numbers" : "number"
            }.`,
        );
    } else if (minSpecialCharacterRegex.test(value) === false) {
        passwordInput.setCustomValidity(
            `Passwords must have atleast ${formRequirements.passwords.minSpecialChar} special ${
                formRequirements.passwords.minSpecialChar > 1 ?
                    "characters"
                :   "character"
            } (such as ! or # )`,
        );
    } else {
        passwordInput.setCustomValidity("");
    }
};

const validateConfirmPassword = () => {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;

    confirmPasswordInput.reportValidity();

    if (value !== passwordValue) {
        confirmPasswordInput.setCustomValidity("Passwords do not match.");
    } else {
        confirmPasswordInput.setCustomValidity("");
    }
};

const validateCountry = () => {
    const validity = countryInput.validity;

    countryInput.reportValidity();

    if (countryInput.value === "placeholder") {
        countryInput.setCustomValidity("Please select a country.");
    } else {
        countryInput.setCustomValidity("");
    }

    if (validity.valid) {
        postcodeInput.disabled = false;
    }
};

const validatePostCode = () => {
    const value = postcodeInput.value;
    const validity = postcodeInput.validity;

    postcodeInput.reportValidity();

    if (validity.valueMissing) {
        postcodeInput.setCustomValidity("Please enter a Postcode.");
    } else if (validatePostalCode(countryInput.value, value) === false) {
        postcodeInput.setCustomValidity("Please enter a valid Postcode.");
    } else {
        postcodeInput.setCustomValidity("");
    }
};

emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmPasswordInput.addEventListener("input", validateConfirmPassword);
countryInput.addEventListener("change", validateCountry);
postcodeInput.addEventListener("input", validatePostCode);

const allCountries = getAllCountries().sort((a, b) =>
    a.countryName.localeCompare(b.countryName),
);

const loadCountryOptions = (countriesData) => {
    countriesData.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.countryCode;
        option.textContent = country.countryName;

        countryInput.appendChild(option);
    });
};

loadCountryOptions(allCountries);

const submitButton = document.getElementById("submitButton");
const signupForm = document.getElementById("signupForm");

submitButton.addEventListener("click", () => {
    validatePostCode();
    validateCountry();
    validateConfirmPassword();
    validatePassword();
    validateEmail();

    signupForm.requestSubmit();
});
