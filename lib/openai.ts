import OpenAI from "openai";

const apiKey =
  typeof process !== "undefined" ? process.env.OPENAI_API_KEY : undefined;

export const openai =
  apiKey && apiKey.trim() !== ""
    ? new OpenAI({ apiKey, maxRetries: 3, timeout: 15000 })
    : null;
