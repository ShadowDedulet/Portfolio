// Import node modules
import express from "express";
// Import local
import projects from "../projects/projects";
import params from "../settings/params";
import functions from "../functions/functions";
import authorizator from "./../middleware/authorizator";

//

const router = express.Router();

router.route("/").get((req, res, next) => {
    let translated = functions.getTranslatedElems(req);

    if (projects) functions.localizeDate(projects, translated.format);

    let _params = Object.assign({}, params);
    _params.showProfile = true;
    _params.showSearchBar = true;

    res.render(`${__dirname}/../../public/shadowdedulet/views/index`, {
        SITE: translated,
        PARAMS: _params,
        URL: {
            url: req.headers.host + req.baseUrl + req.path,
            baseUrl: req.headers.host + req.baseUrl,
            host: req.headers.host,
            base: req.baseUrl,
            path: req.path,
        },
        projects: projects,
    });

    next();
});

router.route("/signin").post(authorizator, (req, res, next) => {});

export default router;
