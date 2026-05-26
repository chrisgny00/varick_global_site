// Emits a WordPress eXtended RSS (WXR) document for the content seed.
// Each entry creates a wp:post_type=page (or attachment) — Elementor template data
// is attached via post_meta _elementor_data + _elementor_edit_mode + _elementor_template_type.

const SITE_TITLE = "Varick Global Real Estate Advisors";
const SITE_URL = "http://varickglobal.local";

function xmlEscape(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function cdata(s) {
  return `<![CDATA[${String(s).replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;
}

function pageItem({ id, title, slug, parent = 0, menuOrder = 0, elementorData, content = "", template = "elementor_canvas" }) {
  const now = new Date().toISOString().replace("T", " ").replace("Z", "").slice(0, 19);
  const elementorJson = JSON.stringify(elementorData);
  return `
<item>
  <title>${cdata(title)}</title>
  <link>${SITE_URL}/${slug}/</link>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <dc:creator>${cdata("admin")}</dc:creator>
  <guid isPermaLink="false">${SITE_URL}/?page_id=${id}</guid>
  <description></description>
  <content:encoded>${cdata(content)}</content:encoded>
  <excerpt:encoded>${cdata("")}</excerpt:encoded>
  <wp:post_id>${id}</wp:post_id>
  <wp:post_date>${cdata(now)}</wp:post_date>
  <wp:post_date_gmt>${cdata(now)}</wp:post_date_gmt>
  <wp:comment_status>${cdata("closed")}</wp:comment_status>
  <wp:ping_status>${cdata("closed")}</wp:ping_status>
  <wp:post_name>${cdata(slug)}</wp:post_name>
  <wp:status>${cdata("publish")}</wp:status>
  <wp:post_parent>${parent}</wp:post_parent>
  <wp:menu_order>${menuOrder}</wp:menu_order>
  <wp:post_type>${cdata("page")}</wp:post_type>
  <wp:post_password>${cdata("")}</wp:post_password>
  <wp:is_sticky>0</wp:is_sticky>
  <wp:postmeta>
    <wp:meta_key>${cdata("_wp_page_template")}</wp:meta_key>
    <wp:meta_value>${cdata(template)}</wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key>${cdata("_elementor_edit_mode")}</wp:meta_key>
    <wp:meta_value>${cdata("builder")}</wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key>${cdata("_elementor_template_type")}</wp:meta_key>
    <wp:meta_value>${cdata("wp-page")}</wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key>${cdata("_elementor_version")}</wp:meta_key>
    <wp:meta_value>${cdata("3.18.0")}</wp:meta_value>
  </wp:postmeta>
  <wp:postmeta>
    <wp:meta_key>${cdata("_elementor_data")}</wp:meta_key>
    <wp:meta_value>${cdata(elementorJson)}</wp:meta_value>
  </wp:postmeta>
</item>`;
}

function emitWxr(items) {
  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:excerpt="http://wordpress.org/export/1.2/excerpt/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:wp="http://wordpress.org/export/1.2/">
<channel>
  <title>${xmlEscape(SITE_TITLE)}</title>
  <link>${SITE_URL}</link>
  <description>Varick Global content seed</description>
  <pubDate>${new Date().toUTCString()}</pubDate>
  <language>en-US</language>
  <wp:wxr_version>1.2</wp:wxr_version>
  <wp:base_site_url>${SITE_URL}</wp:base_site_url>
  <wp:base_blog_url>${SITE_URL}</wp:base_blog_url>
  <wp:author>
    <wp:author_id>1</wp:author_id>
    <wp:author_login>${cdata("admin")}</wp:author_login>
    <wp:author_email>${cdata("info@varickglobal.com")}</wp:author_email>
    <wp:author_display_name>${cdata("Varick Global")}</wp:author_display_name>
  </wp:author>
  ${items.join("\n")}
</channel>
</rss>`;
}

module.exports = { emitWxr, pageItem };
