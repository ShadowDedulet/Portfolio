import express from "express";
import nodemailer from "nodemailer";
//
import mailConfirmHtml from "./../misc/mailConfirm";
import foos from "./../functions/functions";
//

const confirmSender = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    if (!req.body.confirmationToken) return foos.sendJson(req, res, 500);

    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.MAIL_LOGIN,
                pass: process.env.MAIL_PSWRD,
            },
        });

        const mailOptions = {
            from: `${process.env.MAIL_LOGIN}@gmail.com`,
            to: req.body.email,
            subject: "Confirm your registration on shadowdedulet.",
            html: mailConfirmHtml
                .replace("/login/", req.body.login)
                .replace(
                    "/confirm/",
                    `${req.protocol}://${req.headers.host}/confirm?CT=${req.body.confirmationToken}&language=${req.body.LOCALE}`
                ),
        };

        let info = await transporter.sendMail(mailOptions);
        console.log(`Message sent ${info.messageId}`);

        next();
    } catch (err) {
        console.log(err);
        return foos.sendJson(req, res, 500);
    }
};

export default confirmSender;
