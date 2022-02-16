// ------------------------------------------------ //
//      Sign validation rules                       //
// ------------------------------------------------ //
let loginValidFormat = /^[a-zA-Z0-9_]{8,30}$/g;
let pswrdValidFormat = /^[a-zA-Z0-9\_\-\+\=\?\!\ ]{8,30}$/g;
let emailValidFormat =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/g;

// ------------------------------------------------ //

// ------------------------------------------------ //
//      Usefull functions                           //
// ------------------------------------------------ //
let isValid = (
    element: HTMLInputElement,
    format: RegExp | string,
    showError = false
) => {
    if (element.value.match(format)) return true;
    if (showError) element.classList.add("notValid");
    return false;
};

let removeNotValidClass = (elements: Array<HTMLElement>) => {
    for (let e of elements) e.classList.remove("notValid");
};

let blurActiveElement = () => {
    let active = <HTMLElement>document.activeElement;
    if (active) active.blur();
};

let createXHR = (path: string) => {
    let xhr = new XMLHttpRequest();
    let query = `${document.location.search}`;
    xhr.open("POST", `${path}${query}`);
    xhr.setRequestHeader("Content-type", "application/json");
    return xhr;
};

declare function md5(
    value: string,
    key?: string | null | undefined,
    raw?: boolean | undefined
): string;

let hash = (value: string, salt: string) => {
    return md5(value + salt);
};

// ------------------------------------------------ //

import responser from "./responser.js";

// ------------------------------------------------ //
//      On sign form submit                         //
// ------------------------------------------------ //
const addSubmitInListener = () => {
    let submitInBtn = <HTMLButtonElement>document.getElementById("submitIn");
    if (!submitInBtn) return;

    submitInBtn.addEventListener("click", async (e) => {
        // rewriting form.submit to XMLHttpRequest
        e.preventDefault();

        // get inputs
        let loginIn = <HTMLInputElement>document.getElementById("loginIn");
        let pswrdIn = <HTMLInputElement>document.getElementById("passwordIn");

        if (!loginIn || !pswrdIn) return e.preventDefault();

        hash("qwerty123", "qwerty123");

        // Clear bottom border
        blurActiveElement();

        // Clear error message
        removeNotValidClass([loginIn, pswrdIn]);

        hash(loginIn.value, "1");
        // check if data valid
        let isFormValid = true;
        if (
            !isValid(loginIn, loginValidFormat) &&
            !isValid(loginIn, emailValidFormat, true)
        )
            isFormValid = false;
        if (!isValid(pswrdIn, pswrdValidFormat, true)) isFormValid = false;
        if (!isFormValid) return;

        let xhr = createXHR("/sign");
        xhr.send();

        xhr.onload = function () {
            let salt: string | undefined;
            if (this.status !== 200) salt = undefined;
            else salt = JSON.parse(this.responseText).salt;

            if (salt === undefined)
                return responser(500, '{ info: "Internal." }');

            // Send POST request
            let xhrIn = createXHR("signin");

            xhrIn.onload = function () {
                // do something to response
                console.log(xhrIn.responseText);
                let errorType = responser(this.status, this.responseText);

                // if data is wrong/not valid
                if (errorType) {
                    loginIn.classList.add("notValid");
                    pswrdIn.classList.add("notValid");
                }
            };

            xhrIn.send(
                JSON.stringify({
                    login: loginIn.value,
                    password: hash(pswrdIn.value, salt),
                })
            );
        };
    });
};

const addSubmitUpListener = () => {
    let submitUpBtn = <HTMLButtonElement>document.getElementById("submitUp");
    if (!submitUpBtn) return;

    submitUpBtn.addEventListener("click", async (e) => {
        // rewriting form.submit to XMLHttpRequest
        e.preventDefault();

        // get inputs
        let loginUp = <HTMLInputElement>document.getElementById("loginUp");
        let emailUp = <HTMLInputElement>document.getElementById("emailUp");
        let pswrdUp = <HTMLInputElement>document.getElementById("passwordUp");
        let repeatPswrdUp = <HTMLInputElement>(
            document.getElementById("repeatPasswordUp")
        );

        if (!loginUp || !emailUp || !pswrdUp || !repeatPswrdUp)
            return e.preventDefault();

        // Clear bottom border
        blurActiveElement();

        // Clear error message
        removeNotValidClass([loginUp, emailUp, pswrdUp, repeatPswrdUp]);

        // check if data valid
        let isFormValid = true;
        if (!isValid(loginUp, loginValidFormat, true)) isFormValid = false;
        if (!isValid(emailUp, emailValidFormat, true)) isFormValid = false;
        if (!isValid(pswrdUp, pswrdValidFormat, true)) isFormValid = false;
        if (repeatPswrdUp.value !== pswrdUp.value) {
            isFormValid = false;
            repeatPswrdUp.classList.add("notValid");
        }
        if (!isFormValid) return;

        let xhr = createXHR("/sign");
        xhr.send();

        xhr.onload = function () {
            let salt: string | undefined;
            if (this.status !== 200) salt = undefined;
            else salt = JSON.parse(this.responseText).salt;

            if (salt === undefined)
                return responser(500, '{ info: "Internal." }');
            // Send POST request
            let xhrUp = createXHR("signup");

            xhrUp.onload = function () {
                console.log(xhrUp.responseText);
                // do something to response
                let errorType = responser(this.status, this.responseText);

                // if data is wrong/not valid
                if (errorType) {
                    if (errorType === "loginemail") {
                        loginUp.classList.add("notValid");
                        emailUp.classList.add("notValid");
                    } else if (errorType === "login") {
                        loginUp.classList.add("notValid");
                    } else if (errorType === "email") {
                        emailUp.classList.add("notValid");
                    }
                }
            };

            xhrUp.send(
                JSON.stringify({
                    login: loginUp.value,
                    email: emailUp.value,
                    password: hash(pswrdUp.value, salt),
                })
            );
        };
    });
};

const addSumbitListeners = () => {
    addSubmitInListener();
    addSubmitUpListener();
};

export default addSumbitListeners;
