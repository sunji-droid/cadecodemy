# CadeCodemy

[![CI](https://github.com/sunji-droid/cadecodemy/actions/workflows/ci.yml/badge.svg)](https://github.com/sunji-droid/cadecodemy/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> From first line to full mastery.

CadeCodemy is a free, beautiful, offline-capable Progressive Web App (PWA) academy for coding and data science. Learners start as absolute beginners and can advance to true system mastery without paywalls, trial subscriptions, or third-party tracking.

---

## Author & Credits

**Created by Kabo Merapelo Onamile**  
Public health monitoring and evaluation specialist; digital health and health information systems developer.  
Molepolole, Botswana  

- **GitHub:** [https://github.com/sunji-droid](https://github.com/sunji-droid)
- **LinkedIn:** [https://linkedin.com/in/kabo-onamile](https://linkedin.com/in/kabo-onamile)
- **Certifications:** HackerRank SQL (Advanced) Certified, HackerRank Software Engineer Certified.
- **Open-Source Tooling:** Author of [`me-indicator-toolkit`](https://github.com/sunji-droid/me-indicator-toolkit) (npm library for health and M&E analytics).

---

## Core Features

- **In-Browser Execution:** Client-side sandboxing for Python, SQL (SQLite WebAssembly via `sql.js`), modern JavaScript, simulated Bash terminal shell, and R.
- **Structured Curriculum:** 5 core tracks (Python, SQL, JavaScript, Bash, R) and 8 essential supporting courses covering Statistics, Data Cleaning, Data Visualisation, Git, Excel, Machine Learning, Data Ethics, and Public Health Data.
- **Event-Log Derived XP:** XP is derived mathematically from an immutable event log to prevent state drift.
- **Six Stages of Mastery:** Seedling, Sprout, Builder, Analyst, Architect, and Master, unlocking substantive perks at each tier.
- **Verified Certificates:** Downloadable landscape A4 certificates generated dynamically via `pdf-lib` complete with verification codes, QR identifiers, and creator signature blocks.
- **Offline PWA Readiness:** Service Worker precaches the app shell, fonts, and core lessons. Zero runtime Google Fonts or tracking CDNs.

---

## Development & Testing

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run unit tests and content verification
npm run test

# Check copy style against banned clichés (Field Guide compliance)
npm run check:style

# Build for production
npm run build
```
