# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Setup

Use `npm` to install dependencies and start the development server:

```bash
npm install
npm run dev
```

The site will be available at http://localhost:5173 by default.

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

In the editor view you can export your card preview as a PNG image. Click **Download PNG** below the preview to save the card. You can also copy a shareable URL with **Share Link** which preserves the message and template in the query string.
You can manually open the editor at `/editor?message=Hello&template=birthday` to load a specific card.

## License

This project is licensed under the [MIT License](LICENSE).

