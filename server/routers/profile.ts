import express from "express";
//
import foos from "../functions/functions";
import params from "../settings/params";
//

import jwtAuthorizator from "../middleware/jwtAuthorizator";

//

const router = express.Router();

router.route("/").get(jwtAuthorizator, (req, res, _next) => {
    if (!req.body.user) return foos.sendJson(req, res, 500);

    console.log(req.body.user.createdAt);
    req.body.user.createdAtStr = foos.localizeDate(
        req.body.user.createdAt,
        req.body.DATE_FORMAT
    );

    let _params = Object.assign({}, params); // all hiden

    res.status(200).render(
        `${__dirname}/../../public/shadowdedulet/views/profile`,
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
            USER: req.body.user,
        }
    );
});

export default router;
