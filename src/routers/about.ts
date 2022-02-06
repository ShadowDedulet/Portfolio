// Import node modules
import express from "express";
// Import local
import params from "../settings/params";
import functions from "../functions/functions";

//

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        let translatedElems = functions.getTranslatedElems(req);
        let translatedText = functions.getTranslatedText(req);

        res.render(`${__dirname}/../../public/shadowdedulet/views/aboutMe`, {
            SITE: translatedElems,
            PARAMS: params,
            URL: {
                url: req.headers.host + req.baseUrl + req.path,
                baseUrl: req.headers.host + req.baseUrl,
                host: req.headers.host,
                base: req.baseUrl,
                path: req.path,
            },
            TEXT: {
                aboutMeHeader: translatedText.aboutMeHeader,
                aboutMeFooter: translatedText.aboutMeFooter,
            },
        });

        next();
    })
    .post((req, res, next) => {
        res.send("todo");
        next();
    });

export default router;
