// Import node modules
import express from "express";
// Import local
import params from "../settings/params";

// Import middlewares

//

const router = express.Router();

router.route("/").get((req, res, _next) => {
    res.render(`${__dirname}/../../public/shadowdedulet/views/aboutMe`, {
        PARAMS: params,
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
