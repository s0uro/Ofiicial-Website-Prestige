/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Mapbox token for the contact-page fly-to map. Optional. */
  readonly PUBLIC_MAPBOX_TOKEN?: string;
  /** TikTok Pixel ID. When unset, no advertising script is shipped at all. */
  readonly PUBLIC_TIKTOK_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
