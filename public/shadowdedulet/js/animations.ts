let maxBlur = 4;
let maxOpacity = 1;

const animate = (object: HTMLElement, fooName: string) => {
    if (!(fooName in animations && fooName in animationsTime))
        return console.log("no such animation");

    let start = Date.now();
    let time = animationsTime[fooName];
    let timer = setInterval(() => {
        let timePassed = Date.now() - start;

        if (timePassed >= time) {
            clearInterval(timer);
            return;
        }

        animations[fooName](object, timePassed / time);
    }, 5);
};

const animationsTime: { [key: string]: number } = {
    Blur: 200,
    Unblur: 200,
    Show: 300,
    Unshow: 300,
};

const animations: { [key: string]: Function } = {
    Blur: (object: HTMLElement, current: number) => {
        object.style.filter = "blur(" + current * maxBlur + "px)";
    },

    Unblur: (object: HTMLElement, current: number) => {
        object.style.filter = "blur(" + (1 - current) * maxBlur + "px)";
    },

    Show: (object: HTMLElement, current: number) => {
        object.style.opacity = (current * maxOpacity).toString();
    },

    Unshow: (object: HTMLElement, current: number) => {
        object.style.opacity = ((1 - current) * maxOpacity).toString();
    },
};

export default animate;
