import { tutorHttp } from '../server/companionHttp.js';

export default tutorHttp(() => ({ apiKey: process.env.ONEINFERENCE_API_KEY, model: process.env.ONEINFERENCE_TUTOR_MODEL }));
