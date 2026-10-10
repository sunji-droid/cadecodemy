import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { AIChatWidget } from '../features/ai/AIChatWidget';
import styles from './Layout.module.css';

export const Layout: React.FC = () => {
  return (
    <div className={styles.layoutContainer}>
      <Navigation />
      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.contentArea}>
          <Outlet />
        </main>
        <Footer />
        {/* Real Live LLM Assistant (OpenRouter / Groq / OpenAI) */}
        <AIChatWidget />
      </div>
    </div>
  );
};
