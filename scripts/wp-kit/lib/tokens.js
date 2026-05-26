// Elementor global colors + fonts derived from src/lib/design-tokens.ts.
// Keep these in sync with src/app/globals.css.

const colors = [
  { _id: "primary", title: "Primary", color: "#a6192e" }, // vg-crimson
  { _id: "secondary", title: "Accent", color: "#d2203a" }, // vg-vivid
  { _id: "text", title: "Text", color: "#ffffff" },
  { _id: "accent", title: "Pewter", color: "#a6a6a6" },
  { _id: "vg_onyx", title: "Onyx", color: "#111111" },
  { _id: "vg_deep", title: "Deep", color: "#0a0a0a" },
  { _id: "vg_card", title: "Card", color: "#0f0f0f" },
  { _id: "vg_gold", title: "Gold", color: "#b8952a" },
  { _id: "vg_gold_light", title: "Gold Light", color: "#d4a93a" },
  { _id: "elite_violet", title: "Elite Violet", color: "#8b60ff" },
  { _id: "elite_violet_light", title: "Elite Violet Light", color: "#a78bff" },
  { _id: "elite_navy", title: "Elite Navy", color: "#050510" },
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
:root {
  --vg-hairline: rgba(255,255,255,0.08);
}
body { background: #0a0a0a; color: #ffffff; font-family: "Raleway", sans-serif; font-weight: 300; }

.eyebrow, .eyebrow * {
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  font-size: 11px !important;
  letter-spacing: 3px !important;
  text-transform: uppercase !important;
  color: #d2203a !important;
  line-height: 1 !important;
}

.italic-accent em, .italic-accent i { color: #d2203a; font-style: italic; }

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
  background: #0f0f0f;
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
}

.vg-card.accent-top { border-top: 2px solid #a6192e; }

.vg-badge {
  display: inline-flex;
  align-items: center;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  padding: 6px 12px;
  border: 1px solid rgba(166,25,46,0.3);
  background: rgba(166,25,46,0.1);
  color: #d2203a;
  border-radius: 2px;
}

.vg-badge.gold { color: #d4a93a; background: rgba(184,149,42,0.1); border-color: rgba(184,149,42,0.4); }
.vg-badge.elite { color: #a78bff; background: rgba(139,96,255,0.15); border-color: rgba(139,96,255,0.4); }
.vg-badge.neutral { color: #a6a6a6; background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }

.elite-page { background: #050510 !important; }
.elite-page .italic-accent em, .elite-page .italic-accent i { color: #a78bff; }
.elite-page .eyebrow, .elite-page .eyebrow * { color: #a78bff !important; }

.vg-button-primary {
  background-color: #a6192e !important;
  color: #ffffff !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  padding: 14px 28px !important;
}
.vg-button-primary:hover { background-color: #d2203a !important; }

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
.vg-button-outline:hover { color: #d2203a !important; border-color: #d2203a !important; }

.vg-button-elite {
  background-color: #8b60ff !important;
  color: #ffffff !important;
  font-family: "Montserrat", sans-serif !important;
  font-weight: 700 !important;
  letter-spacing: 2.5px !important;
  text-transform: uppercase !important;
  font-size: 11px !important;
  border-radius: 2px !important;
  padding: 14px 28px !important;
}
.vg-button-elite:hover { background-color: #a78bff !important; }

h1, h2, h3, h4, h5 { font-family: "Cormorant Garamond", serif !important; font-weight: 300; color: #ffffff; }
.elementor-heading-title { font-family: "Cormorant Garamond", serif !important; }
`.trim();

module.exports = { colors, fonts, customCss };
