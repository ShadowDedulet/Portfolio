let openedWindow: HTMLElement | null;
let content = <HTMLDivElement>document.getElementById("content");

let isLanguageOpen = false;

// Animation properties

let maxBlur = 4;
let isBlured = false;

let maxOpacity = 1;

// Usefull functions

let animate = (
    time: number,
    foo: Function,
    object: HTMLElement,
    value?: number
) => {
    let start = Date.now();

    let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        if (timePassed >= time) {
            clearInterval(timer);
            return;
        }

        foo(object, timePassed / time, value);
    }, 5);
};

let Blur = (object: HTMLElement, current: number, value: number) => {
    object.style.filter = "blur(" + current * value + "px)";
};

let Unblur = (object: HTMLElement, current: number) => {
    object.style.filter = "blur(" + (1 - current) * maxBlur + "px)";
};

let Show = (object: HTMLElement, current: number, value: number) => {
    object.style.opacity = (current * value).toString();
};

let Unshow = (object: HTMLElement, current: number) => {
    object.style.opacity = ((1 - current) * maxOpacity).toString();
};

// Close opened window with 'esc' button

document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (openedWindow) {
        animate(500, Unshow, openedWindow, 0);
        openedWindow.style.pointerEvents = "none";
        openedWindow = null;
        if (isBlured) {
            animate(250, Unblur, content, 0);
            isBlured = false;
        }
    }

    if (isLanguageOpen) {
        animate(500, Unshow, languageContainer, 1);
        isLanguageOpen = false;
    }
});

// On Sign in/up button click

let signInBtn = <HTMLDivElement>document.getElementById("signInBtn");
let signUpBtn = <HTMLDivElement>document.getElementById("signUpBtn");

let signInContainer = <HTMLDivElement>(
    document.getElementById("signInContainer")
);
let signUpContainer = <HTMLDivElement>(
    document.getElementById("signUpContainer")
);

if (signInBtn)
    signInBtn.addEventListener("click", (e) => {
        if (openedWindow === signInContainer) return;

        if (openedWindow) {
            openedWindow.style.opacity = "0";
            openedWindow.style.pointerEvents = "none";
        }
        openedWindow = signInContainer;
        openedWindow.style.pointerEvents = "all";
        if (!isBlured) {
            animate(200, Blur, content, maxBlur);
            isBlured = true;
        }
        animate(500, Show, openedWindow, 1);
    });

if (signUpBtn)
    signUpBtn.addEventListener("click", (e) => {
        if (openedWindow === signUpContainer) return;

        if (openedWindow) {
            openedWindow.style.opacity = "0";
            openedWindow.style.pointerEvents = "none";
        }
        openedWindow = signUpContainer;
        openedWindow.style.pointerEvents = "all";
        if (!isBlured) {
            animate(200, Blur, content, maxBlur);
            isBlured = true;
        }
        animate(500, Show, openedWindow, 1);
    });

// On Discord click

let discordBtn = <HTMLParagraphElement>document.getElementById("discordBtn");
let discordCopied = <HTMLParagraphElement>(
    document.getElementById("discordCopied")
);

if (discordBtn)
    discordBtn.addEventListener("click", (e) => {
        console.log("clicked");
        navigator.clipboard.writeText("kitten#2810");
        animate(250, Show, discordCopied, 1);
        setTimeout(() => {
            animate(250, Unshow, discordCopied, 0);
        }, 1000);
    });

// On Select language click

let currentLanguage = <HTMLParagraphElement>(
    document.getElementById("currentLanguage")
);

let languageContainer = <HTMLDivElement>(
    document.getElementById("languageContainer")
);

if (currentLanguage)
    currentLanguage.addEventListener("click", (e) => {
        let pointerEvent = isLanguageOpen ? "none" : "all";
        let showFoo = isLanguageOpen ? Unshow : Show;
        isLanguageOpen = !isLanguageOpen;
        languageContainer.style.pointerEvents = pointerEvent;
        animate(500, showFoo, languageContainer, 1);
    });

// Search project

let projects = document.getElementsByClassName("project");
let search = <HTMLInputElement>document.getElementById("search");

if (search)
    search.addEventListener("input", (e) => {
        const value = search.value.toLowerCase();
        let projectsArr: Array<HTMLElement> =
            Array.prototype.slice.call(projects);

        // unhide all projects
        projectsArr.forEach((project) => project!.classList.remove("project"));

        let hidden = projectsArr
            .map((project) => {
                if (!project.id.includes(value)) return project;
            })
            .filter(Boolean);

        // hide searched projects
        hidden.forEach((project) => project!.classList.add("hide"));
    });

// Sign validation rules

let loginValidSymbols = /^[a-zA-Z0-9_]{6,20}$/g;
let pswrdValidSymbols = /^[a-zA-Z0-9\_\-\+\=\?\!\ ]{6,20}$/g;

let isValid = (element: HTMLInputElement, format: RegExp | string) => {
    if (element.value.match(format)) return true;

    element.classList.add("notValid");
    return false;
};

// On sign form submit

let signInForm = <HTMLFormElement>document.getElementById("signInForm");

let signUpForm = <HTMLFormElement>document.getElementById("signUpForm");
let loginUp = <HTMLInputElement>document.getElementById("loginUp");
let pswrdUp = <HTMLInputElement>document.getElementById("passwordUp");
let repeatPswrdUp = <HTMLInputElement>(
    document.getElementById("repeatPasswordUp")
);

let submitInBtn = <HTMLButtonElement>document.getElementById("submitIn");

// if (submitInBtn)
//     submitInBtn.addEventListener("click", (e) => {
//         // get inputs
//         let loginIn = <HTMLInputElement>document.getElementById("loginIn");
//         let pswrdIn = <HTMLInputElement>document.getElementById("passwordIn");

//         if (!loginIn || !pswrdIn) return e.preventDefault();

//         // Clear error message
//         loginIn.classList.remove("notValid");
//         pswrdIn.classList.remove("notValid");

//         // check if data valid
//         let isFormValid = true;
//         isFormValid = isValid(loginIn, loginValidSymbols) && isFormValid;
//         isFormValid = isValid(pswrdIn, pswrdValidSymbols) && isFormValid;

//         if (!isFormValid) {
//             e.preventDefault();
//         }
//     });

if (submitInBtn)
    submitInBtn.addEventListener("click", (e) => {
        // rewrite form.submit to XMLHttpREsponse
        e.preventDefault();

        // get inputs
        let loginIn = <HTMLInputElement>document.getElementById("loginIn");
        let pswrdIn = <HTMLInputElement>document.getElementById("passwordIn");

        if (!loginIn || !pswrdIn) return e.preventDefault();

        // Clear error message
        loginIn.classList.remove("notValid");
        pswrdIn.classList.remove("notValid");

        // check if data valid
        let isFormValid = true;
        isFormValid = isValid(loginIn, loginValidSymbols) && isFormValid;
        isFormValid = isValid(pswrdIn, pswrdValidSymbols) && isFormValid;

        if (!isFormValid) return;

        // let formData = new FormData();
        // formData.append("login", loginIn.value);
        // formData.append("password", pswrdIn.value);

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/signin");
        xhr.setRequestHeader(
            "Content-type",
            // "application/x-www-form-urlencoded"
            "application/json"
        );

        xhr.onload = function () {
            // do something to response
            console.log(this.responseText);
        };

        xhr.send(
            JSON.stringify({
                login: loginIn.value,
                password: pswrdIn.value,
            })
        );
    });
