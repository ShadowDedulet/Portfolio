import express from "express";
import date from "date-and-time";
//
import { locales, elemDict, textDict, infoDict } from "../languages/languages";

//

const translator = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    let localeKey = "en";
    let language = req.query.language;
    if (language && language.toString() in locales)
        localeKey = language.toString();

    date.locale(locales[localeKey]);
    req.body.LOC_ELEMENTS = elemDict[localeKey];
    req.body.LOC_TEXT = textDict[localeKey];
    req.body.LOC_INFO = infoDict[localeKey];
    req.body.DATE_FORMAT = elemDict[localeKey].format;
    req.body.LOCALE = localeKey;

    next();
};

export default translator;
