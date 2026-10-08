import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { Header } from './Header';
import { SocraticAssistantWidget } from '../features/assistant/SocraticAssistantWidget';
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
        {/* Floating In-Browser Socratic AI Assistant */}
        <SocraticAssistantWidget />
      </div>
    </div>
  );
};
