const en = require("date-and-time/locale/en");
const ru = require("date-and-time/locale/ru");

type elemTrans = {
    [english: string]: string;
};

let elemDict: { [languageCode: string]: elemTrans } = {
    en: {
        locale: en,
        localeStr: "en",
        format: "MMMM D, YYYY",

        search: "search",
        signIn: "sign in",
        signUp: "sign up",
        login: "login",
        password: "password",
        passwordRepeat: "repeat password",
        forgot: "forgot password?",

        aboutMe: "about me",
        current: "english",
        eng: "english",
        rus: "russian",
    },
    ru: {
        locale: ru,
        localeStr: "ru",
        format: "D MMMM, YYYY",

        search: "поиск",
        signIn: "Вход",
        signUp: "Регистрация",
        login: "логин",
        password: "пароль",
        passwordRepeat: "повторите пароль",
        forgot: "забыли пароль?",

        aboutMe: "обо мне",
        current: "русский",
        eng: "английский",
        rus: "русский",
    },
};

type textTrans = {
    [elemName: string]: Array<string>;
};

let textDict: { [languageCode: string]: textTrans } = {
    en: {
        locale: [en],
        aboutMeHeader: [
            "Hello,",
            "I am shadowdedulet - owner and creator of this website and the projects on it. Currently I live in Moscow and study at BMSTU. As you can see, in my free time I learn new features and algorithms and write small solo projects - especially I enjoy visualised projects with some kind of interaction.",
            "Russian is my native language, I have C1 level for English and B2 level for Polish.",
            "By far I have learned/ am in the process of improving my knowledge of С++.",
        ],
        aboutMeFooter: [
            "My preffered code editor is Visual Studio Code.",
            "I hope you find my little projects interesting, can gain some knowledge for your own future purposes and just have fun playing around.",
        ],
    },
    ru: {
        locale: [ru],
        aboutMeHeader: [
            "Привет,",
            "Я shadowdedulet - владелец и создатель этого сайта и всех размещенных здесь проектов. Сейчас я живу в Москве и учусь в МГТУ. В свободное время я изучаю новые фичи, алгоритмы и пишу свои небольшие проекты, особенно нравятся визуализированные с возможностью интеракции.",
            "Русский - мой родной язык, по CEFR мой уровень владения английским - C1 и B2 для польского.",
            "На данный момент я изучил/в процессе улучшения своих навыков в:",
        ],
        aboutMeFooter: [
            "В качестве редактора кода я использую Visual Studio Code.",
            "Надеюсь ты найдешь мои небольшие проекты интересными, сможешь набрать идей для своих будущих целей и просто получишь удовольствие, играясь.",
        ],
    },
};

export { elemDict, textDict };
