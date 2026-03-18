# Portfolio

A dark-themed developer portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Email**: [Resend](https://resend.com)
- **Deployment**: [Vercel](https://vercel.com)

---

## Getting Started Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in every value (see [Environment Variables](#environment-variables) below).

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | API key used to send contact-form emails via [Resend](https://resend.com/api-keys) |
| `CONTACT_EMAIL` | ✅ | The email address that receives submitted contact messages |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Production domain (e.g. `https://yourname.dev`) — used for OG image URLs |

### Getting a Resend API key

1. Sign up at [resend.com](https://resend.com)
2. Go to **API Keys → Create API Key**
3. Copy the key and paste it as `RESEND_API_KEY` in `.env.local`
4. In `lib/sendEmail.ts`, update the `from` field to use a domain you have [verified in Resend](https://resend.com/docs/dashboard/domains/introduction)

> **Note**: During development you can use `onboarding@resend.dev` as the `from` address — but emails will only be delivered to the Resend account's owner address.

---

## Populating Content

- **Projects** → edit the array in [`data/projects.ts`](./data/projects.ts)
- **Skills** → edit the array in [`data/skills.ts`](./data/skills.ts)
- **OG image** → replace [`public/og-image.png`](./public/og-image.png) (1200 × 630 px)
- **Personal details** → update the `metadata` export in [`app/layout.tsx`](./app/layout.tsx)

---

## Deploying to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial portfolio"
git push origin main
```

### 2. Import the project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import** next to your GitHub repo
3. Vercel auto-detects Next.js — no build settings needed

### 3. Add environment variables

In the Vercel project dashboard → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `RESEND_API_KEY` | Your Resend API key |
| `CONTACT_EMAIL` | Your recipient email |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` (or custom domain) |

### 4. Deploy

Click **Deploy**. Vercel builds and serves your site. Subsequent pushes to `main` trigger automatic redeployments.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Create optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
