import express from "express";
import date from "date-and-time";
import jwt from "jsonwebtoken";

//

const functions = {
    sendJson: (
        req: express.Request,
        res: express.Response,
        status: number,
        infoName: string = "default"
    ) => {
        res.status(status);
        res.json({
            info: req.body.LOC_INFO[status][infoName],
            type: infoName,
        });
    },

    localizeDate: (_date: Date, format: string) => {
        return date.format(_date, format);
    },

    generateJWT: (login: string, id: string) => {
        return jwt.sign({ login: login, device: id }, process.env.JWT!, {
            // algorithm: 'ES256',
            expiresIn: "24h",
        });
    },
};

export default functions;
