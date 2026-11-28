import { companionHttp } from '../server/companionHttp.js';

export default companionHttp(() => ({ apiKey: process.env.ONEINFERENCE_API_KEY, models: process.env.ONEINFERENCE_MODELS }));
