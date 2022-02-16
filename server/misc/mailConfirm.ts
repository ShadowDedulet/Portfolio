const mailConfirmHtml = `<body>
    <div class="container" style="position: relative;width: 600px;top: 100px;margin: 0 auto;border: 1px solid #000;font-family: monospace;">
        <div class="name" style="display: flex;justify-content: center;align-items: center;margin: 0 auto;width: 100%;height: 60px;border-bottom: 2px solid rgba(0, 0, 0, 0.5);font-size: 32px;">
            <h style="padding: 10px;margin: 0 auto;font-size: 32px;">shadowdedulet.</h>
        </div>
        <p style="font-size: 24px;padding-left: 20px;padding-right: 20px;">Dear /login/,</p>
        <p style="font-size: 18px;padding-left: 20px;padding-right: 20px;">Thank you for creating account.</p>
        <p style="font-size: 18px;padding-left: 20px;padding-right: 20px;">Click the below link to confirm your email. The link and your account will expire in 30 minutes if not confirmed.</p>
        <div class="link" style="display: flex;justify-content: center;align-items: center;margin: 0 auto;width: 300px;height: 60px;background: linear-gradient(287.56deg, rgba(252, 93, 188, 0.64) 0%, rgba(245, 186, 132, 0.64) 100%);border-radius: 10px;">
            <a href="/confirm/" style="width: 286;height: 46px;font-size: 24px;text-decoration: none;text-align: center;line-height: 46px;vertical-align: middle;color: #000;border-radius: 5px;">Confirm your account</a>
        </div>
        <p style="font-size: 18px;padding-left: 20px;padding-right: 20px;">Sincerely, <b><br>shadowdedulet</b>
        </p>
    </div>
</body>`;

export default mailConfirmHtml;
