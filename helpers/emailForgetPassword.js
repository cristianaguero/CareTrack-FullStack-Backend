import nodemailer from 'nodemailer';

const emailForgetPassword = async (data) => {

    const { email, name, surname, token } = data;


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transport.sendMail({
        from: '"CareTrack" <accounts@caretrack.com>',
        to: email,
        subject: "Caretrack - Reset your password",
        html: `
        <h1>Hello Doctor ${name} ${surname}.</h1>
        <p>You have requested to reset your password.</p>
        <p>In order to proceed please follow the link below:</p>
        <a href="${process.env.FRONTEND_URL}/forget-password/${token}">Reset password</a>
        <p>If you did not register with CareTrack, please ignore this email.</p>
        `
    });
}

export default emailForgetPassword;