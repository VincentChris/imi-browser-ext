# imi-browser-ext

Browser extension scaffold based on MV3 + TypeScript + Vite.

## Tech Stack

- Manifest V3 + TypeScript
- Vite + @crxjs/vite-plugin
- React + Tailwind CSS v4 + @tailwindcss/vite
- Biome for lint/format

## Scripts

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm format
```

Package manager: pnpm

## Load in Chrome

1. Run `pnpm dev` or `pnpm build`
2. Open `chrome://extensions`
3. Enable Developer mode
4. Load unpacked and choose the `dist` directory

## Structure

- `src/manifest.ts` - MV3 manifest entry
- `src/background.ts` - service worker
- `src/content.ts` - content script
- `src/popup/` - React UI
