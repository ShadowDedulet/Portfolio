import express from "express";
import date from "date-and-time";
import { projects } from "./src/projects/projects";
import { elemDict, textDict } from "./src/languages/languages";
import { params } from "./src/settings/params";
import { AddressInfo } from "net";

// Foos

let logger = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    next();
};

let getTranslatedElems = (req: express.Request) => {
    let localeKey = "en"; // default language = english
    if (req.query.language && req.query.language.toString() in elemDict)
        localeKey = req.query.language.toString();

    let translated = elemDict[localeKey];
    date.locale(translated.locale);
    return translated;
};

let getTranslatedText = (req: express.Request) => {
    let localeKey = "en"; // default language = english
    if (req.query.language && req.query.language.toString() in textDict)
        localeKey = req.query.language.toString();

    let translated = textDict[localeKey];
    date.locale(translated.locale[0]);
    return translated;
};

let getCurrentUrl = (_url: string) => {
    return _url.match(/^.*(?=(\?))/g);
};

// Set properties

let port: number = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(logger);

// Set routes

app.get("/", (req, res) => {
    let translated = getTranslatedElems(req);

    if (projects)
        projects.forEach(
            (project) =>
                (project.dateStr = date.format(project.date, translated.format))
        );

    let _params = Object.assign({}, params);
    _params.showProfile = true;
    _params.showSearchBar = true;

    res.render(`${__dirname}/public/shadowdedulet/views/index`, {
        SITE: translated,
        PARAMS: _params,
        CUR_URL: getCurrentUrl(req.url),
        projects: projects,
    });
});

app.get("/about", (req, res) => {
    let translatedElems = getTranslatedElems(req);
    let translatedText = getTranslatedText(req);

    res.render(`${__dirname}/public/shadowdedulet/views/aboutMe`, {
        SITE: translatedElems,
        PARAMS: params,
        CUR_URL: getCurrentUrl(req.url),
        TEXT: {
            aboutMeHeader: translatedText.aboutMeHeader,
            aboutMeFooter: translatedText.aboutMeFooter,
        },
    });
});

// Listen

let server = app.listen(port, () => {
    let addrInfo = <AddressInfo>server.address();
    console.log(`listening on ${addrInfo.address}:${addrInfo.port}`);
});
