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
    if (e.key.toLowerCase() !== "escape") return;

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
        projectsArr.forEach((project) => (project!.className = "project"));

        let hidden = projectsArr
            .map((project) => {
                if (!project.id.includes(value)) return project;
            })
            .filter(Boolean);

        // hide searched projects
        hidden.forEach((project) => (project!.className += " hide"));
    });
