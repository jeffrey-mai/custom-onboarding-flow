# Custom Onboarding Flow
This application is a custom onboarding flow that ask users questions for their birthday, about me, address, and item interests then displays items that is dedicated to the user

## Tech Stack
- Frontend: React, TypeScript, Webpack
- Backend: Express.js, TypeScript, PostgreSQL
- Deployed with Vercel

## Important Information
- The admin and items page will not function correctly without going through the onboarding flow first
- Items page will take a few seconds to fetch from a clothing API to render
- The backend endpoints to receive data are:
  - /account?username=`<your username>`&password=`<your password>`
  - /data/accounts
  - /data/forms
