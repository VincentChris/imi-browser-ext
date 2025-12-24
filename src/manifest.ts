import type { ManifestV3Export } from "@crxjs/vite-plugin";

const manifest: ManifestV3Export = {
  manifest_version: 3,
  name: "imi-browser-ext",
  version: "0.1.0",
  description: "imi browser extension scaffold",
  action: {
    default_title: "imi",
    default_popup: "src/popup/index.html",
    default_icon: {
      16: "src/assets/icon-16.png",
      32: "src/assets/icon-32.png",
      48: "src/assets/icon-48.png",
      128: "src/assets/icon-128.png"
    }
  },
  icons: {
    16: "src/assets/icon-16.png",
    32: "src/assets/icon-32.png",
    48: "src/assets/icon-48.png",
    128: "src/assets/icon-128.png"
  },
  background: {
    service_worker: "src/background.ts",
    type: "module"
  },
  permissions: ["cookies", "tabs", "activeTab", "storage"],
  host_permissions: ["<all_urls>"],
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content.ts"]
    }
  ]
};

export default manifest;
