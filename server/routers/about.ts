// Import node modules
import express from "express";
// Import local
import params from "../settings/params";
// Import middlewares

//

const router = express.Router();

router.route("/").get((req, res, _next) => {
    let _params = Object.assign({}, params);
    if (req.body.jwtdata) _params.showProfile = true;
    else _params.showSign = true;

    res.render(`${__dirname}/../../public/shadowdedulet/views/aboutMe`, {
        LOC_ELEMENTS: req.body.LOC_ELEMENTS,
        LOC_TEXT: req.body.LOC_TEXT,
        LOC_INFO: req.body.LOC_INFO,
        LOCALE: req.body.LOCALE,

        PARAMS: _params,
        URL: {
            url: req.headers.host + req.baseUrl + req.path,
            baseUrl: req.headers.host + req.baseUrl,
            host: req.headers.host,
            base: req.baseUrl,
            path: req.path,
        },
    });
});

export default router;
