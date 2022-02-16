const en = require("date-and-time/locale/en");
const ru = require("date-and-time/locale/ru");

const locales: { [languageCode: string]: string } = {
    en: en,
    ru: ru,
};

type elemTrans = {
    [english: string]: string;
};

const elemDict: { [languageCode: string]: elemTrans } = {
    en: {
        format: "MMMM D, YYYY",

        search: "search",
        signIn: "sign in",
        signUp: "sign up",
        logout: "log out",

        account: "account",
        role: "role",
        createdAt: "created at",

        login: "login",
        or: "or",
        email: "email",
        password: "password",
        passwordRepeat: "repeat password",
        forgot: "forgot password?",

        aboutMe: "about me",
        current: "english",
        eng: "english",
        rus: "russian",
    },
    ru: {
        format: "D MMMM, YYYY",

        search: "поиск",
        signIn: "вход",
        signUp: "регистрация",
        logout: "выйти",

        account: "аккаунт",
        role: "роль",
        createdAt: "создан",

        login: "логин",
        or: "или",
        email: "почта",
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

const textDict: { [languageCode: string]: textTrans } = {
    en: {
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

type infoCommonTrans = {
    [infoName: string]: string;
};

type infoTrans = {
    [statusCode: number]: { [infoName: string]: string };
};

const infoCommon: { [languageCode: string]: infoCommonTrans } = {
    en: {
        refresh: " Refresh page or try again later.",
        contact: " If error does not dissapear please contact administrator.",
        full: " Refresh page or try again later. If error does not dissapear please contact administrator.",
    },
    ru: {
        refresh: " Перезагрузите страницу или попробуйте еще раз позже.",
        contact:
            " Если ошибка не пропала, пожалуйста, обратитесь к администратору.",
        full: " Перезагрузите страницу или попробуйте еще раз позже. Если ошибка не пропала, пожалуйста, обратитесь к администратору.",
    },
};

const infoDict: { [languageCode: string]: infoTrans } = {
    en: {
        200: {
            default: "Successfull",
            signin: "Successfully signed in.",
            signup: "Successfully signed up.",
            confirmed: "Successfully confirmed e-mail.",
        },
        400: {
            default: "Received empty data." + infoCommon.en.full,
            data: "Received empty data." + infoCommon.en.full,
        },
        401: {
            default: "Not authorized",
        },
        403: {
            default: "Not authenticated",
        },
        409: {
            default: "Wrong data.",
            auth: "Wrong login or password.",
            login: "Login is already taken.",
            email: "E-mail is already taken.",
            loginemail: "Login and E-mail are already taken.",
            confirm: "Account is not confirmed. Please check your e-mail.",
            dead: "Account is disabled or deleted. Please, contact administrator.",
            token: "Wrong or expired confirmation token." + infoCommon.en.full,
            redo: "Action was already done." + infoCommon.en.contact,
            logout: "Please, log out from current accout.",
        },
        500: {
            default: infoCommon.en.full,
        },
    },
    ru: {
        200: {
            default: "Успешно",
            signin: "Успешно авторизировано.",
            signup: "Успешно зарегистрировано.",
            confirmed: "Почта успешно подтверждена.",
        },
        400: {
            default: "Получены пустые данные." + infoCommon.en.full,
            data: "Получены пустые данные." + infoCommon.ru.full,
        },
        401: {
            default: "Не авторизован",
        },
        403: {
            default: "Не аутентифицирован",
        },
        409: {
            default: "Неверные данные.",
            auth: "Неправильный логин и/или пароль.",
            login: "Логин уже используется.",
            email: "Почта уже используется.",
            loginemail: "Логин и почта уже используются.",
            confirm: "Аккаунт не подтвержден. Пожалуйста, проверьте почту.",
            dead: "Аккаунт отключен или удален. Пожалуйста, обратитесь к  администратору.",
            token:
                "Неверный или истекший токен подтверждения." +
                infoCommon.ru.full,
            redo: "Действие уже было выполнено." + infoCommon.ru.contact,
            logout: "Пожалуйста, выйдите из текущего аккаунта",
        },
        500: {
            default: infoCommon.en.full,
        },
    },
};

export { locales, elemDict, textDict, infoDict };
