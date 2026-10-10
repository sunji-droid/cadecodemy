import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Settings, 
  Key, 
  ExternalLink, 
  Trash2,
  Cpu
} from 'lucide-react';
import { 
  ChatMessage, 
  AISettings, 
  loadAISettings, 
  saveAISettings, 
  sendChatMessage, 
  DEFAULT_MODELS, 
  AIProvider 
} from '../../lib/ai/aiClient';
import styles from './AIChatWidget.module.css';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<AISettings>(loadAISettings);
  const [tempKey, setTempKey] = useState(settings.apiKey);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Dumelang! I'm the CadeCodemy Technical Assistant powered by live LLMs. Ask me any coding challenge, debug a Python/SQL error, or inquire about health data analytics.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AISettings = {
      ...settings,
      apiKey: tempKey.trim()
    };
    setSettings(updated);
    saveAISettings(updated);
    setIsSettingsOpen(false);
    setError(null);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    if (!settings.apiKey) {
      setIsSettingsOpen(true);
      setError('Please add your free API key below to enable live responses.');
      return;
    }

    const userText = input.trim();
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const reply = await sendChatMessage(messages, userText, settings);
      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      setError(err.message || 'Failed to communicate with AI model.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `clr_${Date.now()}`,
        role: 'assistant',
        content: "Chat cleared. What technical topic or bug would you like to explore?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className={styles.widgetWrapper}>
      {!isOpen && (
        <button
          className={styles.triggerButton}
          onClick={() => setIsOpen(true)}
          title="Open AI Engineering Assistant"
          aria-label="Open AI Assistant"
        >
          <Bot size={20} className={styles.botIcon} />
          <span className={styles.triggerLabel}>AI Assistant</span>
          <span className={styles.liveIndicator}>●</span>
        </button>
      )}

      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <Cpu size={18} className={styles.headerIcon} />
              <div>
                <strong>CadeCodemy AI</strong>
                <span className={styles.modelBadge}>
                  {settings.provider} · {settings.model.split('/').pop()}
                </span>
              </div>
            </div>

            <div className={styles.headerActions}>
              <button
                className={styles.iconBtn}
                onClick={handleClearChat}
                title="Clear Conversation"
              >
                <Trash2 size={16} />
              </button>
              <button
                className={`${styles.iconBtn} ${isSettingsOpen ? styles.activeBtn : ''}`}
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                title="API Settings (OpenRouter / Groq / OpenAI)"
              >
                <Settings size={16} />
              </button>
              <button
                className={styles.iconBtn}
                onClick={() => setIsOpen(false)}
                title="Close Window"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Settings Drawer */}
          {isSettingsOpen && (
            <form onSubmit={handleSaveSettings} className={styles.settingsPanel}>
              <div className={styles.settingsHeader}>
                <Key size={15} />
                <span>Configure Live AI Gateway</span>
              </div>

              <div className={styles.formGroup}>
                <label>Provider</label>
                <select
                  value={settings.provider}
                  onChange={(e) => {
                    const p = e.target.value as AIProvider;
                    setSettings({
                      ...settings,
                      provider: p,
                      model: DEFAULT_MODELS[p][0]
                    });
                  }}
                  className={styles.selectInput}
                >
                  <option value="openrouter">OpenRouter (Free Models: Llama 3.3, Qwen Coder)</option>
                  <option value="groq">Groq (Ultra-Fast Free Tier)</option>
                  <option value="openai">OpenAI (GPT-4o, GPT-4o-mini)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Model</label>
                <select
                  value={settings.model}
                  onChange={(e) => setSettings({ ...settings, model: e.target.value })}
                  className={styles.selectInput}
                >
                  {DEFAULT_MODELS[settings.provider].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>API Key</label>
                <input
                  type="password"
                  placeholder={
                    settings.provider === 'openrouter' ? 'sk-or-v1-...' :
                    settings.provider === 'groq' ? 'gsk_...' : 'sk-proj-...'
                  }
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  className={styles.textInput}
                />
              </div>

              <div className={styles.keyHelp}>
                {settings.provider === 'openrouter' && (
                  <a href="https://openrouter.ai/keys" target="_blank" rel="noreferrer">
                    Get Free OpenRouter Key <ExternalLink size={12} />
                  </a>
                )}
                {settings.provider === 'groq' && (
                  <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer">
                    Get Free Groq Key <ExternalLink size={12} />
                  </a>
                )}
                {settings.provider === 'openai' && (
                  <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">
                    OpenAI API Keys <ExternalLink size={12} />
                  </a>
                )}
                <span className={styles.privacyNote}>Key stored locally in browser localStorage.</span>
              </div>

              <button type="submit" className={styles.saveBtn}>Save & Connect</button>
            </form>
          )}

          {/* Messages Area */}
          <div className={styles.messagesArea}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageBubble} ${m.role === 'user' ? styles.userBubble : styles.assistantBubble}`}
              >
                <div className={styles.messageContent}>{m.content}</div>
                <div className={styles.messageTime}>{m.timestamp}</div>
              </div>
            ))}

            {loading && (
              <div className={`${styles.messageBubble} ${styles.assistantBubble}`}>
                <div className={styles.typingIndicator}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}

            {error && (
              <div className={styles.errorAlert}>
                ⚠️ {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Form */}
          <form onSubmit={handleSend} className={styles.promptForm}>
            <input
              type="text"
              placeholder={settings.apiKey ? "Ask code syntax, bugs, SQL queries..." : "Click ⚙️ to add your API key first..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.chatInput}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!input.trim() || loading}
              aria-label="Send prompt"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
