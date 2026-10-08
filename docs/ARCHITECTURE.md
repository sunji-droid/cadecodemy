# # CadeCodemy Architecture

## Overview
CadeCodemy is built as an offline-first single page application powered by React 18, TypeScript, Vite, and Zustand.

## Key Architectural Decisions
1. **Zero External Font Requests:** Cormorant Garamond, Plus Jakarta Sans, and JetBrains Mono are loaded locally from `/public/fonts` via standard `@font-face` rules. This enables complete offline reliability and prevents layout shifts.
2. **Immutable Event-Log Gamification:** XP is never maintained as an arbitrary mutable counter. It is computed via `getTotalXP(events)` over an append-only array of `XPEvent` items.
3. **Client-Side Code Sandboxing:**
   - **JavaScript:** Evaluated in dedicated Web Workers with an 8,000ms timeout.
   - **Python:** Pyodide WebAssembly with deterministic fallback.
   - **SQL:** `sql.js` SQLite WebAssembly with pre-seeded district health datasets.
   - **Bash:** Transparent virtual filesystem (VFS) terminal simulation.
   - **R:** Evaluated with statistical summary parsers and webR bridge.
4. **Local Certificate Verification:** Certificates feature cryptographic hashes and QR codes checked in browser on `/verify`.
