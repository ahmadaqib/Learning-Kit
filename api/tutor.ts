import { tutorHttp } from '../server/companionHttp.js';

export default tutorHttp(() => ({ apiKey: process.env.TOKENPORTAL_API_KEY, model: process.env.TOKENPORTAL_TUTOR_MODEL }));
