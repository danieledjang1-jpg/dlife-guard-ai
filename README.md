# DLife Guard AI — React Prototype

A responsive, animated frontend prototype inspired by the supplied LIFE GUARD AI concept, customised to **DLife Guard AI** with blue/green styling and the provided photo displayed on the robot's chest.

## Run locally
1. Install Node.js (LTS) if it is not installed: https://nodejs.org/
2. Extract this folder.
3. Open the `dlife-guard-ai` folder in VS Code.
4. Open Terminal → New Terminal.
5. Run:
   ```bash
   npm install
   npm run dev
   ```
6. Open the local URL printed by Vite, usually `http://localhost:5173`.

## Features included
- Animated splash / sign-in / sign-up screens.
- Local browser demo session and profile persistence.
- Responsive dashboard with blue/green theme.
- Reusable React components and page sections.
- Animated robot with the provided personal avatar on its chest, pulsing heart, visual life meter and chip connection effect.
- Personal AI assistant chat demo with simulated responses and starter prompts.
- Wellbeing check-in form saved locally.
- Demo alerts with mark-as-reviewed behavior.
- Add/remove trusted contacts stored locally.
- Settings, motion toggle, simulated robot connection and adjustable demo meter.
- Exportable sample report JSON.
- Mobile navigation, transitions and reduced-motion support.

## Important limitations
This is a **frontend prototype**, not a production medical, emergency, or life-monitoring system.
- The “life percentage,” heart/chip, battery, and robot connection are visual simulations only. They do not measure human lifespan, vital signs, safety, or suicidal intent.
- Assistant replies are scripted demo responses, not a connected LLM.
- Login/sign-up is local browser demo authentication, not secure production authentication.
- There is no backend, database, live robot, real sensor, emergency dispatch, or external contact messaging yet.
- Do not enter sensitive personal or medical information into this demo.

## Recommended next development steps
1. Connect a real AI provider through a secure backend (never place secret API keys in frontend code).
2. Add server-side authentication, PostgreSQL database, consent management, and audit logs.
3. Add human-supervised support workflows and verified local emergency contact procedures.
4. Only integrate validated hardware sensors for clearly specified uses, after consent and safety review.
5. Test with accessibility, privacy, security, and qualified clinical input before any real-world use.

## Deploy
You can deploy the static frontend to Netlify or Vercel. Build command: `npm run build`; output directory: `dist`. Use only demo data in public deployments until a secure backend is implemented.
