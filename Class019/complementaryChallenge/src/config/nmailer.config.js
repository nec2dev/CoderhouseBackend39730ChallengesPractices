import nodemailer from 'nodemailer';
import config from './env.config.js';

export const transporter = nodemailer.createTransport({
    host: `smtp.gmail.com`,
    port: 465,
    service: 'gmail',
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
});

