const { section, column, heading, textEditor, html, spacer, eyebrow } = require("../lib/widgets");

// Shared page-hero section used across most sub-pages.
function pageHero({ eyebrowText, title, italicWord, subtitle, variant = "default" }) {
  const titleHtml = italicWord && title.includes(italicWord)
    ? title.replace(
        italicWord,
        `<em style="color:${variant === "elite" ? "#a78bff" : "#d2203a"};font-style:italic;">${italicWord}</em>`,
      )
    : title;
  const bg = variant === "elite"
    ? "linear-gradient(135deg, #050510 0%, #0a0520 50%, #0d0308 100%)"
    : "linear-gradient(135deg, #0a0a0a 0%, #14060a 50%, #0a0a0a 100%)";

  return section(
    {
      padding: { unit: "px", top: 140, right: 24, bottom: 100, left: 24, isLinked: false },
      background_background: "classic",
      background_color: "#0a0a0a",
    },
    [
      column({}, [
        html({
          markup: `
<div style="background:${bg};padding:80px 0;margin:-100px -24px 0;">
  <div style="max-width:1280px;margin:0 auto;padding:0 24px;">
    <div style="max-width:780px;">
      ${eyebrowText ? `<div class="eyebrow" style="margin-bottom:20px;">${eyebrowText}</div>` : ""}
      <h1 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:72px;line-height:1.08;color:#fff;margin:0;">${titleHtml}</h1>
      ${subtitle ? `<p style="margin-top:24px;color:#a6a6a6;font-size:18px;line-height:1.7;max-width:640px;">${subtitle}</p>` : ""}
    </div>
  </div>
</div>`,
        }),
      ]),
    ],
  );
}

function basicSection({ children, bg = "#0a0a0a", padTop = 80, padBottom = 80 } = {}) {
  return section(
    {
      padding: { unit: "px", top: padTop, right: 24, bottom: padBottom, left: 24, isLinked: false },
      background_color: bg,
    },
    [column({}, children)],
  );
}

module.exports = { pageHero, basicSection };
