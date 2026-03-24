# Farm2Market

A marketplace connecting farmers directly to consumers.

## Structure
- `/frontend`: React application (Vite)
- `/backend`: Node.js Express server with Supabase integration

## Deployment
- **Frontend**: [Vercel](https://farm2market-lime.vercel.app)
- **Backend**: [Render](https://farm-2-market.onrender.com)

## Environment Variables
Ensure you set the following environment variables in your deployment platforms:

### Frontend (Vercel)
- `VITE_BACKEND_URL=https://farm-2-market.onrender.com`

### Backend (Render)
- `PORT=5000`
- `JWT_SECRET`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `DATABASE_URL`
