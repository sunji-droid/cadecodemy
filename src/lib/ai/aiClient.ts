export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export type AIProvider = 'openrouter' | 'groq' | 'openai';

export interface AISettings {
  provider: AIProvider;
  apiKey: string;
  model: string;
}

export const DEFAULT_MODELS: Record<AIProvider, string[]> = {
  openrouter: [
    'openrouter/free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'google/gemini-2.0-flash-exp:free'
  ],
  groq: [
    'llama-3.3-70b-versatile',
    'llama-3.1-8b-instant',
    'mixtral-8x7b-32768'
  ],
  openai: [
    'gpt-4o-mini',
    'gpt-4o'
  ]
};

const PROVIDER_ENDPOINTS: Record<AIProvider, string> = {
  openrouter: 'https://openrouter.ai/api/v1/chat/completions',
  groq: 'https://api.groq.com/openai/v1/chat/completions',
  openai: 'https://api.openai.com/v1/chat/completions'
};

const STORAGE_KEY = 'cadecodemy_ai_config';

export function loadAISettings(): AISettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.provider && parsed.apiKey) return parsed;
    }
  } catch {
    // fallback
  }
  return {
    provider: 'openrouter',
    apiKey: '',
    model: 'openrouter/free'
  };
}

export function saveAISettings(settings: AISettings): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const SYSTEM_PROMPT = `You are the CadeCodemy Technical Assistant, created for Kabo Merapelo Onamile's coding and data science academy.
You are an expert engineer and health data informatician.
Your instructions:
1. Answer questions directly, precisely, and with production-ready code examples when requested.
2. If asked to fix a bug or explain an error, explain the root cause clearly and provide the exact corrected code.
3. Specialize in Python, SQL/SQLite, R, TypeScript/JavaScript, Bash, and Public Health M&E (DHIS2, EPI data, cold-chain telemetry).
4. Keep explanations concise, professional, and free of conversational fluff.`;

export async function sendChatMessage(
  history: ChatMessage[],
  newMessage: string,
  settings: AISettings
): Promise<string> {
  if (!settings.apiKey.trim()) {
    throw new Error('Please enter your API Key in the Settings cog (⚙️) to chat with the AI model.');
  }

  const endpoint = PROVIDER_ENDPOINTS[settings.provider];
  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...history.map(m => ({ role: m.role, content: m.content })),
    { role: 'user', content: newMessage }
  ];

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${settings.apiKey.trim()}`
  };

  if (settings.provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://sunji-droid.github.io/cadecodemy/';
    headers['X-Title'] = 'CadeCodemy Academy';
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: settings.model || DEFAULT_MODELS[settings.provider][0],
      messages,
      temperature: 0.3
    })
  });

  if (!response.ok) {
    let errorMsg = `API request failed with status ${response.status}`;
    try {
      const errJson = await response.json();
      if (errJson?.error?.message) {
        errorMsg = errJson.error.message;
      }
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  const choice = data?.choices?.[0]?.message?.content;
  if (!choice) {
    throw new Error('No content returned from AI provider.');
  }

  return choice;
}
