import animate from "./animations.js";

let messageFromTopContainer = <HTMLDivElement>(
    document.getElementById("messageTopContainer")
);
let messageFromTopStatus = <HTMLDivElement>document.getElementById("status");
let messageFromTopInfo = <HTMLParagraphElement>document.getElementById("info");

let msgAmount = 0;
let msgOkTime = 1000;
let msgNotokTime = 5000;

const responser = (
    status: number,
    responseText: string
): string | undefined => {
    let res = JSON.parse(responseText);
    let msgShowTime = 0;

    messageFromTopStatus.classList.remove("ok");
    messageFromTopStatus.classList.remove("notok");

    //  Everything OK
    if (status === 200) {
        messageFromTopStatus.classList.add("ok");
        msgShowTime = msgOkTime;

        console.log("ok");
    } else {
        messageFromTopStatus.classList.add("notok");
        msgShowTime = msgNotokTime;
        console.log("not ok");
    }

    messageFromTopInfo.textContent = res.info
        ? res.info
        : "Unhandled situation";

    animate(messageFromTopContainer, "Show");
    msgAmount++;
    setTimeout(() => {
        msgAmount--;
        if (msgAmount === 0) {
            animate(messageFromTopContainer, "Unshow");
        }
        if (res.redirect) window.open(res.redirect, res.target);
    }, msgShowTime);

    return res.type;
};

export default responser;
