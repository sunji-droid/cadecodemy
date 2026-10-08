import React, { useState, useRef, useEffect } from 'react';
import { getSocraticAssistantReply, ChatMessage } from '../../lib/assistant/socraticEngine';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import styles from './SocraticAssistantWidget.module.css';

export const SocraticAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: "Dumelang! I'm your Socratic Duck Debugger. Stuck on an error, logic bug, or algorithm concept? Ask me, and let's trace it through together without giving away the answer.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const query = input;
    setInput('');

    // Simulate natural thinking delay
    setTimeout(() => {
      const reply = getSocraticAssistantReply(query);
      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    }, 450);
  };

  return (
    <div className={styles.widgetWrapper}>
      {/* Floating Trigger Pill */}
      {!isOpen && (
        <button
          className={styles.triggerButton}
          onClick={() => setIsOpen(true)}
          title="Open Socratic AI Assistant"
          aria-label="Open Socratic Assistant"
        >
          <Bot size={20} className={styles.botIcon} />
          <span className={styles.triggerLabel}>Ask Socratic AI</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerTitle}>
              <Bot size={18} className={styles.headerIcon} />
              <div>
                <strong>Socratic Duck Assistant</strong>
                <span className={styles.subStatus}>100% In-Browser · CS50-Style Tutor</span>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close Assistant"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.messageBubble} ${m.sender === 'user' ? styles.userBubble : styles.assistantBubble}`}
              >
                <div className={styles.messageText}>{m.text}</div>
                <div className={styles.messageTime}>{m.timestamp}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className={styles.inputForm}>
            <input
              type="text"
              placeholder="Ask about a bug, syntax, or algorithm..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn} disabled={!input.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
