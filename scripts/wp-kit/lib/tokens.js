// Elementor global colors + fonts derived from src/lib/design-tokens.ts.
// Keep these in sync with src/app/globals.css.

const colors = [
  { _id: "primary", title: "Primary", color: "#db8a74" }, // vg-salmon
  { _id: "secondary", title: "Accent", color: "#db8a74" }, // vg-salmon (same)
  { _id: "text", title: "Text", color: "#ffffff" },
  { _id: "accent", title: "Silver", color: "#d1d1d1" },
  { _id: "vg_onyx", title: "Onyx", color: "#2f243a" },
  { _id: "vg_deep", title: "Deep", color: "#2f243a" },
  { _id: "vg_card", title: "Card", color: "#3a2e47" },
  { _id: "vg_almond", title: "Almond", color: "#fac9b8" },
  { _id: "vg_gold", title: "Gold", color: "#b8952a" },
  { _id: "vg_gold_light", title: "Gold Light", color: "#d4a93a" },
  { _id: "elite_violet", title: "Elite Almond", color: "#fac9b8" },
  { _id: "elite_violet_light", title: "Elite Almond Light", color: "#fac9b8" },
  { _id: "elite_navy", title: "Elite Midnight", color: "#1f1828" },
];

const fonts = [
  { _id: "primary", title: "Primary", typography_typography: "custom", typography_font_family: "Cormorant Garamond", typography_font_weight: "300" },
  { _id: "secondary", title: "Heading", typography_typography: "custom", typography_font_family: "Cormorant Garamond", typography_font_weight: "400" },
  { _id: "text", title: "Body", typography_typography: "custom", typography_font_family: "Raleway", typography_font_weight: "300" },
  { _id: "accent", title: "Accent", typography_typography: "custom", typography_font_family: "Montserrat", typography_font_weight: "700", typography_text_transform: "uppercase", typography_letter_spacing: { unit: "px", size: 2.5 } },
];

// CSS that the kit injects into Elementor's Site Settings → Custom CSS.
const customCss = `
/* Varick Global — kit custom CSS */

/* === Hide WordPress.com promo bars + "Powered by" credits ===
   Overshoots intentionally — wpcom rotates action-bar class names. */
#wpadminbar, .masterbar, .wpcom-masterbar, .wp-com-bar,
.wpcom-action-bar, .wpcom-upgrade-nudge, .upgrade-nudge, .notice-upgrade,
#actionbar, .actionbar, .wpcom-actionbar, .cta-link-side-bar,
.wpcom-gift-banner, .wpcom-gift, .wpcom-jitm, .jitm-banner,
[class*="wpcom-action-bar"], [class*="wpcom-upgrade"], [class*="wpcom-gift"],
[class*="wpcom-jitm"], [class*="gift-author"], [class*="gift-the-author"],
[class*="enjoy-this-site"], [class*="actionbar"], [id*="actionbar"],
iframe[name*="wpcom"], iframe[name*="actionbar"], iframe[name*="action-bar"],
iframe[src*="wordpress.com/action-bar"],
iframe[src*="wordpress.com/wp-content/mu-plugins/actionbar"],
iframe[src*="public-api.wordpress.com"],
iframe[title*="WordPress.com"], iframe[title*="Action Bar"],
.powered-by-wpcom, .wpcom-site-credit, .site-info-wpcom,
[class*="powered-by-wordpress"], [class*="powered-by-wp"]
{ display: none !important; visibility: hidden !important; height: 0 !important; }
html, body { margin-top: 0 !important; padding-top: 0 !important; }

:root {
  --vg-hairline: rgba(209,209,209,0.18);
}
body { background: #2f243a; color: #ffffff; font-family: "Raleway", sans-serif; font-weight: 300; }

.eyebrow, .eyebrow * {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  font-size: 11px !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  color: #db8a74 !important;
  line-height: 1 !important;
}

.italic-accent em, .italic-accent i { color: #db8a74; font-style: italic; }

.diagonal-lines {
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255,255,255,0.03) 0,
    rgba(255,255,255,0.03) 1px,
    transparent 1px,
    transparent 12px
  );
}

.vg-card {
  background: #3a2e47;
  border: 1px solid rgba(209,209,209,0.18);
  border-radius: 4px;
}

.vg-card.accent-top { border-top: 2px solid #db8a74; }

.vg-badge {
  display: inline-flex;
  align-items: center;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 1px solid rgba(219,138,116,0.3);
  background: rgba(219,138,116,0.1);
  color: #db8a74;
  border-radius: 2px;
}

.vg-badge.gold { color: #d4a93a; background: rgba(184,149,42,0.1); border-color: rgba(184,149,42,0.4); }
.vg-badge.elite { color: #fac9b8; background: rgba(250,201,184,0.15); border-color: rgba(250,201,184,0.4); }
.vg-badge.neutral { color: #d1d1d1; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }

.elite-page { background: #1f1828 !important; }
.elite-page .italic-accent em, .elite-page .italic-accent i { color: #fac9b8; }
.elite-page .eyebrow, .elite-page .eyebrow * { color: #fac9b8 !important; }

.vg-button-primary {
  background-color: #db8a74 !important;
  color: #ffffff !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  padding: 14px 28px !important;
}
.vg-button-primary:hover { background-color: #db8a74 !important; }

.vg-button-outline {
  background-color: transparent !important;
  color: #ffffff !important;
  border: 1px solid rgba(255,255,255,0.3) !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  padding: 14px 28px !important;
}
.vg-button-outline:hover { color: #db8a74 !important; border-color: #db8a74 !important; }

.vg-button-elite {
  background-color: #fac9b8 !important;
  color: #ffffff !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  padding: 14px 28px !important;
}
.vg-button-elite:hover { background-color: #fac9b8 !important; }

h1, h2, h3, h4, h5 { font-family: "Cormorant Garamond", serif !important; font-weight: 300; color: #ffffff; }
.elementor-heading-title { font-family: "Cormorant Garamond", serif !important; }
`.trim();

module.exports = { colors, fonts, customCss };
