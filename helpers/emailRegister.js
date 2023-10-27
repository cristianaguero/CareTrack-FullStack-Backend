import nodemailer from 'nodemailer';

const emailRegister = async (data) => {

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
        subject: "Caretrack - Confirm your account",
        html: `
        <h1>Hello Doctor ${name} ${surname}.</h1>
        <p>Thank you for registering with CareTrack.</p>
        <p>Please confirm your account by clicking the link below:</p>
        <a href="${process.env.FRONTEND_URL}/confirm-account/${token}">Confirm your account</a>
        <p>If you did not register with CareTrack, please ignore this email.</p>
        `
    });
}

export default emailRegister;