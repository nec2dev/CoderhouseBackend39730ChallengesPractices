import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();
const ACCOUNT_SID = ``;
const AUTH_TOKEN = ``;
const PHONE_NUMBER_WHATSAPP = ``;
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

const sendWhatsApp = async (body, from, to) => {
  try {
    const message = await client.messages.create({
      body: body,
      from: from,
      to: to,
    });
    console.log(message);
  } catch (e) {
    console.error(e.message);
  }
};

export default {
  sendSMS,
  sendWhatsApp,
};
