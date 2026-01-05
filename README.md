# imi-browser-ext

Scaffold for a Chrome/Edge extension built with MV3, TypeScript, Vite and React.

## Prerequisites

- Node.js ≥18
- pnpm (packageManager is pinned to the version in `package.json`)

## Tech stack

- Manifest V3 + TypeScript
- Vite + `@crxjs/vite-plugin` for extension bundling & HMR
- React + Tailwind CSS v4 (`@tailwindcss/vite`)
- Biome for lint/format

## Features

- Cookie Sync
  - 从当前活跃 tab 读取指定 cookie（向上尝试父域），写入到目标域名，避免同域/父域误同步
  - 支持自动带上 path、Secure、HttpOnly、SameSite 等属性
  - 输入的目标域名与 cookie key 会自动保存到 `chrome.storage.local`
- Country Switcher（仅 localhost 可用）
  - 在本地页面写入 `TIMEZONE_COUNTRY` 与 `TIMEZONE` 两个 cookie
  - 可搜索国家名，选择后立即写入
- 体验细节
  - 记住上次激活的功能页签
  - Toast 提示成功/错误

## Scripts

```bash
pnpm install           # install deps
pnpm dev               # watch mode with CRX live reload; load dist/ as unpacked
pnpm build             # production build to dist/
pnpm preview           # serve the built popup for quick UI checks
pnpm lint              # biome check
pnpm format            # biome format --write
```

## Load extension in Chrome

1) Run `pnpm dev` (for live reload) or `pnpm build` (static bundle).
2) Open `chrome://extensions`, enable **Developer mode**.
3) Click **Load unpacked** and select the `dist/` directory.

## Project layout

- `src/manifest.ts` – MV3 manifest source
- `src/background.ts` – service worker entry
- `src/content.ts` – content script entry
- `src/popup/` – React UI (Vite + Tailwind v4)
- `src/shared/` – shared utilities/constants
- `vite.config.ts` – Vite + CRX + Tailwind config
- `biome.json` – lint/format rules

## Notes

- Icons live in `src/assets/` and are referenced by the manifest.
- Dev mode keeps `dist/` updated; re-selecting the folder is only needed after a clean build.
