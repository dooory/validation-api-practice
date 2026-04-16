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

const validateConfirmPassword = (event) => {
    const input = event.currentTarget;
    const value = input.value;
    const passwordValue = passwordInput.value;

    input.reportValidity();

    if (value !== passwordValue) {
        input.setCustomValidity("Passwords do not match.");
    } else {
        input.setCustomValidity("");
    }
};

const validateCountry = () => {
    const validity = countryInput.validity;

    if (countryInput.value === "placeholder") {
        countryInput.setCustomValidity("Please select a country.");
    } else {
        countryInput.setCustomValidity("");
    }

    if (validity.valid) {
        postcodeInput.disabled = false;
    }
};

const validatePostCode = (event) => {
    const input = event.currentTarget;
    const value = input.value;
    const validity = input.validity;

    input.reportValidity();

    if (validity.valueMissing) {
        input.setCustomValidity("Please enter a Postcode.");
    } else if (validatePostalCode(countryInput.value, value) === false) {
        console.log(value, countryInput.value);
        input.setCustomValidity("Please enter a valid Postcode.");
    } else {
        input.setCustomValidity("");
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

validateCountry();
