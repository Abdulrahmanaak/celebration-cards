# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Setup

Use `npm` to install dependencies and start the development server:

```bash
npm install
npm run dev
```

The site will be available at http://localhost:5173 by default.

### Environment variables

Create a `.env` file with the following variables for your Supabase project:

```bash
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

You must also create a `cards` table in Supabase:

```sql
create table cards (
  id uuid primary key default uuid_generate_v4(),
  template text not null,
  message text,
  placeholder_settings jsonb default '{}'::jsonb,
  download_count integer default 0
);
```

## Directory structure

```
celebration-cards/
├─ index.html          # entry HTML
├─ public/             # static assets served as-is
├─ src/                # application source
│  ├─ assets/          # images and card templates
│  ├─ components/      # React components
│  ├─ App.jsx
│  └─ main.jsx
└─ tailwind.config.js  # Tailwind setup
```

## Creating new templates

Card templates are stored as SVG files in `src/assets/templates`. To add a new
design, place an SVG file in this folder and import it in
`src/components/CardEditor.jsx` by extending the `templates` array.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Downloading cards

In the editor view you can export your card preview as a PNG image. Click **Download PNG** below the preview to save the card.
Use **Save Card** to store the design on Supabase and then **Share Link** to copy a URL like `/card/{id}` which loads the saved message and template.
