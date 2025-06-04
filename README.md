# Celebration Cards

Celebration Cards is a tiny React + Vite application for creating, previewing and
sharing greeting cards. Users can type their own message, choose from one of the
SVG templates and then either download the design as a PNG or share a link that
recreates the card. The project serves as a demonstration of how to build a
simple editor workflow in React.

## Creating and viewing cards

1. Launch the development server (see the setup instructions below).
2. Open `http://localhost:5173` and click **Create Your Card**.
3. Fill out the **Message** field and pick a **Template**.
4. Use **Download PNG** to save the design or **Share Link** to copy a URL that
   loads the same card.

The editor can also be opened directly at `/editor` with optional query
parameters, e.g. `/editor?message=Hello&template=birthday`.

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set Supabase environment variables**

   Create a `.env.local` file in the project root and define the following keys:

   ```bash
   VITE_SUPABASE_URL=<your-supabase-url>
   VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The site will be available at [http://localhost:5173](http://localhost:5173)
   by default.

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
./
├─ index.html          # entry HTML
├─ public/             # static assets served as-is
├─ src/                # application source
│  ├─ assets/          # images and card templates
│  ├─ components/      # React components
│  ├─ App.jsx
│  └─ main.jsx
└─ tailwind.config.js  # Tailwind setup
```

## Adding new SVG templates

Card templates are stored as SVG files in `src/assets/templates`.

1. Add your `.svg` file to this folder.
2. Edit `src/components/CardEditor.jsx` and import the file at the top:

   ```jsx
   import newDesignImg from '../assets/templates/new-design.svg'
   ```

3. Extend the `templates` array with an entry for the new design:

   ```jsx
   const templates = [
     { id: 'birthday', label: 'Birthday', src: birthdayImg },
     // ...other templates
     { id: 'new-design', label: 'New Design', src: newDesignImg },
   ]
   ```

4. Restart the development server and the new template will appear in the
   template selector.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Downloading cards

In the editor view you can export your card preview as a PNG image. Click **Download PNG** below the preview to save the card.
Use **Save Card** to store the design on Supabase and then **Share Link** to copy a URL like `/card/{id}` which loads the saved message and template.
