// Import node modules
import express from "express";
import md5 from "blueimp-md5";
// Import local
import projects from "../projects/projects";
import params from "../settings/params";
import foos from "../functions/functions";

// Import middlewares
import authorizator from "./../middleware/authorizator";
import authenticator from "./../middleware/authenticator";
import userInserter from "./../middleware/userInserter";
import confirmator from "./../middleware/confirmator";
import confirmSender from "./../middleware/confirmSender";

//

const router = express.Router();

router.route("/").get((req, res, _next) => {
    if (projects)
        projects.forEach(
            (project) =>
                (project.dateStr = foos.localizeDate(
                    project.date,
                    req.body.DATE_FORMAT
                ))
        );

    let _params = Object.assign({}, params);
    if (req.body.jwtdata) _params.showProfile = true;
    else _params.showSign = true;
    _params.showSearchBar = true;

    res.status(200).render(
        `${__dirname}/../../public/shadowdedulet/views/index`,
        {
            LOC_ELEMENTS: req.body.LOC_ELEMENTS,
            LOC_TEXT: req.body.LOC_TEXT,
            LOC_INFO: req.body.LOC_INFO,
            LOCALE: req.body.LOCALE,

            PARAMS: _params,
            URL: {
                url: req.headers.host + req.baseUrl + req.path,
                baseUrl: req.headers.host + req.baseUrl,
                protocol: req.protocol,
                host: req.headers.host,
                base: req.baseUrl,
                path: req.path,
            },
            PROJECTS: projects,
        }
    );
});

router.route("/sign").post((_req, res, _next) => {
    let salt = md5(process.env.SALT!);
    res.status(200).json({
        salt: salt,
    });
});

router.route("/signin").post(authorizator, authenticator, (req, res, _next) => {
    let token = foos.generateJWT(req.body.login, req.body.device);
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + 1);
    res.cookie("token", token, { maxAge: expDate.getTime() });

    res.status(200).json({
        info: req.body.LOC_INFO[200].signin,
        redirect: `${req.headers.referer}`,
        target: "_self",
    });
});

router.route("/signup").post(userInserter, confirmSender, (req, res, _next) => {
    res.status(200).json({
        info: req.body.LOC_INFO[200].signup,
        redirect: `${req.headers.referer}`,
        target: "_self",
    });
});

router.route("/confirm").get(confirmator, (req, res, _next) => {
    res.status(200).redirect(`/?language=${req.body.LOCALE}`); // append 'confirmed'
});

export default router;
