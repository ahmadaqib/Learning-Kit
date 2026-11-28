import { chatHttp } from '../server/companionHttp.js';

export default chatHttp(() => ({ apiKey: process.env.ONEINFERENCE_API_KEY, model: process.env.ONEINFERENCE_CHAT_MODEL }));
