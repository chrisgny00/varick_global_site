// Helpers for assembling Elementor section/column/widget trees.
// Output shape matches Elementor's `_elementor_data` JSON schema (version 0.4).

const crypto = require("crypto");

function id() {
  return crypto.randomBytes(4).toString("hex");
}

function section(settings = {}, elements = []) {
  return {
    id: id(),
    elType: "section",
    settings: {
      structure: settings.structure || "10",
      content_width: { unit: "px", size: 1280 },
      gap: "default",
      padding: { unit: "px", top: 80, right: 24, bottom: 80, left: 24, isLinked: false },
      padding_mobile: { unit: "px", top: 48, right: 16, bottom: 48, left: 16, isLinked: false },
      ...settings,
    },
    elements,
    isInner: settings.isInner || false,
  };
}

function column(settings = {}, elements = []) {
  return {
    id: id(),
    elType: "column",
    settings: {
      _column_size: settings._column_size ?? 100,
      _inline_size: null,
      ...settings,
    },
    elements,
    isInner: false,
  };
}

function widget(widgetType, settings = {}) {
  return {
    id: id(),
    elType: "widget",
    widgetType,
    settings,
    elements: [],
  };
}

function heading({ title, tag = "h2", align = "left", color, size, cssClasses, fontFamily, fontWeight, letterSpacing, transform, italic }) {
  const settings = { title, header_size: tag, align };
  if (color) settings.title_color = color;
  if (cssClasses) settings._css_classes = cssClasses;
  if (cssClasses) settings.css_classes = cssClasses;
  const typo = {};
  if (fontFamily) typo.typography_font_family = fontFamily;
  if (size) typo.typography_font_size = { unit: "px", size };
  if (fontWeight) typo.typography_font_weight = String(fontWeight);
  if (letterSpacing != null) typo.typography_letter_spacing = { unit: "px", size: letterSpacing };
  if (transform) typo.typography_text_transform = transform;
  if (italic) typo.typography_font_style = "italic";
  if (Object.keys(typo).length) {
    settings.typography_typography = "custom";
    Object.assign(settings, typo);
  }
  return widget("heading", settings);
}

function textEditor({ text, color = "#a6a6a6", size = 15, lineHeight = 1.7, align = "left" }) {
  return widget("text-editor", {
    editor: `<p>${text}</p>`,
    text_color: color,
    align,
    typography_typography: "custom",
    typography_font_family: "Raleway",
    typography_font_size: { unit: "px", size },
    typography_font_weight: "300",
    typography_line_height: { unit: "em", size: lineHeight },
  });
}

function button({ text, link, variant = "primary", align = "left", icon }) {
  const cls = variant === "elite" ? "vg-button-elite" : variant === "outline" ? "vg-button-outline" : "vg-button-primary";
  return widget("button", {
    text,
    link: { url: link || "#", is_external: "", nofollow: "" },
    align,
    button_css_id: "",
    _css_classes: cls,
    css_classes: cls,
    selected_icon: icon ? { value: icon, library: "fa-solid" } : "",
  });
}

function divider({ color = "rgba(255,255,255,0.08)", weight = 1, gap = 24 } = {}) {
  return widget("divider", {
    color,
    weight: { unit: "px", size: weight },
    gap: { unit: "px", size: gap },
  });
}

function iconBox({ icon = "fas fa-home", title, description, link, color = "#d2203a", titleColor = "#ffffff", descColor = "#a6a6a6" }) {
  return widget("icon-box", {
    selected_icon: { value: icon, library: "fa-solid" },
    title_text: title,
    description_text: description,
    link: link ? { url: link, is_external: "", nofollow: "" } : { url: "", is_external: "", nofollow: "" },
    position: "top",
    primary_color: color,
    title_color: titleColor,
    description_color: descColor,
    title_typography_typography: "custom",
    title_typography_font_family: "Cormorant Garamond",
    title_typography_font_size: { unit: "px", size: 24 },
    title_typography_font_weight: "400",
    description_typography_typography: "custom",
    description_typography_font_family: "Raleway",
    description_typography_font_size: { unit: "px", size: 13 },
    description_typography_font_weight: "300",
    description_typography_line_height: { unit: "em", size: 1.6 },
    hover_animation: "grow",
  });
}

function html({ markup }) {
  return widget("html", { html: markup });
}

function spacer({ size = 40 } = {}) {
  return widget("spacer", { space: { unit: "px", size } });
}

function image({ src = "", alt = "", height = 0 } = {}) {
  return widget("image", {
    image: { url: src, id: "" },
    image_size: "full",
    align: "left",
    caption_source: "none",
    image_custom_dimension: height ? { width: 0, height } : { width: 0, height: 0 },
    alt,
  });
}

function eyebrow(text, { center = false } = {}) {
  return heading({
    title: text,
    tag: "div",
    align: center ? "center" : "left",
    cssClasses: "eyebrow",
  });
}

function darkSection(settings = {}, elements = []) {
  return section(
    {
      background_background: "gradient",
      background_color: "#0a0a0a",
      background_color_b: "#14060a",
      background_gradient_angle: { unit: "deg", size: 135 },
      background_gradient_position: { unit: "%", size: 0 },
      background_color_b_stop: { unit: "%", size: 100 },
      padding: { unit: "px", top: 120, right: 24, bottom: 100, left: 24, isLinked: false },
      ...settings,
    },
    elements,
  );
}

function ctaBand({ eyebrowText = "Begin", title = "Ready to begin?", italicWord = "begin", subtitle = "Speak with a Varick Global advisor.", primaryHref = "/contact", primaryLabel = "Schedule a Consultation", secondaryHref = "/properties", secondaryLabel = "Browse Listings" }) {
  const titleHtml = italicWord && title.includes(italicWord)
    ? title.replace(italicWord, `<em style="color:#d2203a;font-style:italic;">${italicWord}</em>`)
    : title;
  return section(
    {
      background_background: "gradient",
      background_color: "#0a0a0a",
      background_color_b: "#1a0508",
      background_gradient_angle: { unit: "deg", size: 135 },
      padding: { unit: "px", top: 100, right: 24, bottom: 100, left: 24, isLinked: false },
      content_position: "middle",
    },
    [
      column({}, [
        eyebrow(eyebrowText, { center: true }),
        spacer({ size: 16 }),
        heading({ title: titleHtml, tag: "h2", align: "center", size: 48, fontFamily: "Cormorant Garamond", fontWeight: 300 }),
        spacer({ size: 16 }),
        textEditor({ text: subtitle, align: "center", color: "#a6a6a6" }),
        spacer({ size: 32 }),
        html({
          markup: `
<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
  <a href="${primaryHref}" class="vg-button-primary">${primaryLabel}</a>
  <a href="${secondaryHref}" class="vg-button-outline">${secondaryLabel}</a>
</div>`,
        }),
      ]),
    ],
  );
}

module.exports = {
  id,
  section,
  column,
  widget,
  heading,
  textEditor,
  button,
  divider,
  iconBox,
  html,
  spacer,
  image,
  eyebrow,
  darkSection,
  ctaBand,
};
