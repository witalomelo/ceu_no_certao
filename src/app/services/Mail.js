import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

class Mail {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });
    }

    sendMail(message){
        return this.transporter.sendMail({
            from:'"Equipe" <noreply@sertao.com>',
            ...message
        });
    }
}

export default new Mail();