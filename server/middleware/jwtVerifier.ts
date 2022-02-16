import express from "express";
import jwt from "jsonwebtoken";
//
// import foos from "./../functions/functions";

//

const jwtVerifier = (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
) => {
    if (!("token" in req.cookies)) return next();

    const token = req.cookies.token;

    jwt.verify(
        token,
        process.env.JWT!,
        (
            err: jwt.VerifyErrors | null,
            data: string | jwt.JwtPayload | undefined
        ) => {
            if (err) {
                console.log(err);
            }

            req.body.jwtdata = data;
            next();
        }
    );
};

export default jwtVerifier;
