// ------------------------------------------------ //
//      add listener for projects searchbar         //
// ------------------------------------------------ //
import addProjectSearchListener from "./projectsSearch.js";
addProjectSearchListener();
// ------------------------------------------------ //

// ------------------------------------------------ //
//      add listener for signing in/up              //
// ------------------------------------------------ //
import addSubmitListeners from "./signForms.js";
addSubmitListeners();
// ------------------------------------------------ //

import animate from "./animations.js";

let openedWindow: HTMLElement | null;
let content = <HTMLDivElement>document.getElementById("content");

let isLanguageOpen = false;
let isBlured = false;

// ------------------------------------------------ //
//      Close opened window with 'esc' button       //
// ------------------------------------------------ //
document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (openedWindow) {
        animate(openedWindow, "Unshow");
        openedWindow.style.pointerEvents = "none";
        openedWindow = null;
        if (isBlured) {
            animate(content, "Unblur");
            isBlured = false;
        }
    }

    if (isLanguageOpen) {
        animate(languageContainer, "Unshow");
        isLanguageOpen = false;
    }
});
// ------------------------------------------------ //

// ------------------------------------------------ //
//      On Sign in/up button click                  //
// ------------------------------------------------ //
let signInBtn = <HTMLDivElement>document.getElementById("signInBtn");
let signUpBtn = <HTMLDivElement>document.getElementById("signUpBtn");

let signInContainer = <HTMLDivElement>(
    document.getElementById("signInContainer")
);
let signUpContainer = <HTMLDivElement>(
    document.getElementById("signUpContainer")
);

if (signInBtn)
    signInBtn.addEventListener("click", (_e) => {
        if (openedWindow === signInContainer) return;

        if (openedWindow) {
            openedWindow.style.opacity = "0";
            openedWindow.style.pointerEvents = "none";
        }
        openedWindow = signInContainer;
        openedWindow.style.pointerEvents = "all";
        if (!isBlured) {
            animate(content, "Blur");
            isBlured = true;
        }
        animate(openedWindow, "Show");
    });

if (signUpBtn)
    signUpBtn.addEventListener("click", (_e) => {
        if (openedWindow === signUpContainer) return;

        if (openedWindow) {
            openedWindow.style.opacity = "0";
            openedWindow.style.pointerEvents = "none";
        }
        openedWindow = signUpContainer;
        openedWindow.style.pointerEvents = "all";
        if (!isBlured) {
            animate(content, "Blur");
            isBlured = true;
        }
        animate(openedWindow, "Show");
    });
// ------------------------------------------------ //

// ------------------------------------------------ //
//      On Log out button click                  //
// ------------------------------------------------ //
import cookies from "./cookies.js";

let logoutBtn = <HTMLButtonElement>document.getElementById("logout");
if (logoutBtn)
    logoutBtn.addEventListener("click", async (_e) => {
        if (cookies.readCookie("token")) cookies.createCookie("token", "", -1);
        window.open(document.location.href, "_self");
    });
// ------------------------------------------------ //

// ------------------------------------------------ //
//      On Discord click
// ------------------------------------------------ //
let discordID = "kitten#2810";
let discordBtn = <HTMLParagraphElement>document.getElementById("discordBtn");
let discordCopied = <HTMLParagraphElement>(
    document.getElementById("discordCopied")
);

if (discordBtn)
    discordBtn.addEventListener("click", (_e) => {
        console.log("clicked");
        navigator.clipboard.writeText(discordID);
        animate(discordCopied, "Show");
        setTimeout(() => {
            animate(discordCopied, "Unshow");
        }, 1000);
    });
// ------------------------------------------------ //

// ------------------------------------------------ //
//      On Select language click                    //
// ------------------------------------------------ //
let currentLanguage = <HTMLParagraphElement>(
    document.getElementById("currentLanguage")
);

let languageContainer = <HTMLDivElement>(
    document.getElementById("languageContainer")
);

if (currentLanguage)
    currentLanguage.addEventListener("click", (_e) => {
        let pointerEvent = isLanguageOpen ? "none" : "all";
        let showFoo = isLanguageOpen ? "Unshow" : "Show";
        isLanguageOpen = !isLanguageOpen;
        languageContainer.style.pointerEvents = pointerEvent;
        animate(languageContainer, showFoo);
    });
// ------------------------------------------------ //
