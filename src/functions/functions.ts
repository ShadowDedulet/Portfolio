import express from "express";
import date from "date-and-time";
//
import type { Project } from "./../projects/projects";
import { elemDict, textDict } from "./../languages/languages";

//

const functions = {
    getTranslatedElems: (req: express.Request) => {
        let localeKey = "en"; // default language = english
        if (req.query.language && req.query.language.toString() in elemDict)
            localeKey = req.query.language.toString();

        let translated = elemDict[localeKey];
        date.locale(translated.locale);
        return translated;
    },

    getTranslatedText: (req: express.Request) => {
        let localeKey = "en"; // default language = english
        if (req.query.language && req.query.language.toString() in textDict)
            localeKey = req.query.language.toString();

        let translated = textDict[localeKey];
        date.locale(translated.locale[0]);
        return translated;
    },

    getCurrentUrl: (url: string) => {
        return url.match(/^.*(?=(\?))/g);
    },

    localizeDate: (projects: Array<Project>, format: string) => {
        projects.forEach(
            (project) => (project.dateStr = date.format(project.date, format))
        );
    },
};

export default functions;
