import { companionHttp } from '../server/companionHttp.js';

export default companionHttp(() => ({ apiKey: process.env.TOKENPORTAL_API_KEY, models: process.env.TOKENPORTAL_MODELS }));
