import express from "express";
//

import db from "./../db/db";

//

const authorizator = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.login || !req.body.password) {
        return res.status(401).send("No login/password presented!");
    }
    if (!db.connection) {
        return res.status(500).send("Can not connect to DB!");
    }

    const User = db.connection.model("User");

    User.findOne({ login: req.body.login, password: req.body.password }).exec(
        (err, user) => {
            if (err) {
                return res.status(500).send("DB error!");
            }

            if (!user) {
                return res.status(401).send("Wrong login/password!");
            } else {
                console.log("authed", user);
                return res.status(200).send(`${user} found`);
            }
        }
    );
    next();
};

export default authorizator;
