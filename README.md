# Epion Functional Health

An evidence-informed functional nutrition and personalized metabolic health platform led by **Milind Kumar, Functional Nutritionist** in Bellandur, Bengaluru, Karnataka, India.

---

## Features

- **Editorial Homepage Hero**: Integrated whole-food photography with natural aesthetic and clear value proposition.
- **The Tri-Pillar Philosophy**: Synthesis of Traditional Knowledge, Modern Science, and AI-Assisted Insight.
- **Practitioner Dossier**: Direct clinical narrative, background, and practice details for Milind Kumar.
- **Unified Consultation & Direct Scheduling Engine**:
  - Packages: ₹2,000 (75 min initial intake), ₹1,500 (45 min focused intake), ₹1,000 (30 min follow-up).
  - 5-step booking flow with real slot availability in Asia/Kolkata (IST).
  - Choice between In-Clinic (Sarada Residency, Bellandur, Bengaluru) and Virtual Telehealth (HD Video).
  - Atomic interval conflict protection.
  - Downloadable `.ics` calendar invitation.
- **Transactional Email Dispatch**: Live automated email confirmations to patients and notifications to `milindkumar@epionfunctionalhealth.com` via Resend with verified domain `epionfunctionalhealth.com`.
- **Peer-Reviewed Scientific Literature**: Traceable DOI citations and evidence hierarchy.

---

## Local Development

```bash
# Install dependencies
npm install

# Start full-stack development server (Express backend + Vite frontend on port 3000)
npm run dev

# Run TypeScript linter
npm run lint

# Build production bundle
npm run build
```

---

## Environment Variables

Configure the following in `.env` (refer to `.env.example`):

```bash
RESEND_API_KEY="re_..."
CLINIC_ADMIN_EMAIL="milindkumar@epionfunctionalhealth.com"
SENDER_EMAIL="Epion Functional Health <milindkumar@epionfunctionalhealth.com>"
GEMINI_API_KEY="AIzaSy..."
```

---

## Pushing Code to GitHub (`github.com`)

The local git repository has been initialized with the `main` branch. To push this repository to your GitHub account:

### Push to GitHub (`milindkumar-max/epion-functional-health`)
The remote origin is configured as:
`https://github.com/milindkumar-max/epion-functional-health.git`

To push the commits from your local environment or terminal:

```bash
# Push directly to main branch
git push -u origin main
```

*(Note: When prompted for your GitHub password, provide a **GitHub Personal Access Token (classic or fine-grained)** with `repo` scope permissions, as GitHub does not accept account passwords for command-line Git operations).*

Alternatively, if pushing directly with a token:
```bash
git push https://<YOUR_GITHUB_TOKEN>@github.com/milindkumar-max/epion-functional-health.git main
```

---

## Hosting on Custom Domain (`epionfunctionalhealth.com`)

Since you already own the domain `epionfunctionalhealth.com` on Google Workspace / Squarespace, you have two primary deployment paths:

### Method A: Connect Domain to Cloud Run (Current App Runtime)
The application currently runs in Google Cloud Run.
1. Open [Google Cloud Console](https://console.cloud.google.com/run).
2. Go to **Cloud Run** > select your service > click **Manage Custom Domains**.
3. Click **Add Mapping** and enter `epionfunctionalhealth.com` and `www.epionfunctionalhealth.com`.
4. Cloud Run will provide specific DNS records (A and CNAME records).
5. In your **Squarespace / Google Workspace DNS** settings:
   - Add the **A** record pointing `@` to the IP addresses provided by Cloud Run.
   - Add the **CNAME** record pointing `www` to `ghs.googlehosted.com`.
6. Google automatically provisions an SSL/TLS certificate within 15–60 minutes.

### Method B: Deploy from GitHub to Vercel or Render (Zero-Config CI/CD)
Once your code is pushed to GitHub:
1. Go to [Vercel](https://vercel.com) or [Render](https://render.com).
2. Click **New Project** and import your `epion-functional-health` repository.
3. In **Environment Variables**, add:
   - `RESEND_API_KEY`
   - `CLINIC_ADMIN_EMAIL` (`milindkumar@epionfunctionalhealth.com`)
   - `SENDER_EMAIL` (`Epion Functional Health <milindkumar@epionfunctionalhealth.com>`)
4. In **Project Settings > Domains**, enter `epionfunctionalhealth.com`.
5. Update your Squarespace DNS with the records shown by Vercel/Render.
