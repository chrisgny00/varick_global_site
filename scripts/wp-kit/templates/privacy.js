const { html } = require("../lib/widgets");
const { pageHero, basicSection } = require("./common");

module.exports = function buildPrivacy() {
  return [
    pageHero({
      eyebrowText: "Legal",
      title: "Privacy Policy",
      italicWord: "Privacy",
      subtitle: "How Varick Global collects, uses, and protects information you share with us.",
    }),
    basicSection({
      children: [
        html({
          markup: `
<div style="max-width:820px;margin:0 auto;font-size:15px;line-height:1.8;color:#d1d1d1;">
  <p style="margin:0 0 8px;font-family:Montserrat,sans-serif;font-weight:700;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:#a6a6a6;">Effective Date: January 2026</p>
  <p style="margin:0 0 28px;">This Privacy Policy describes how Varick Global Real Estate Advisors ("Varick Global," "we," "our," or "us") collects, uses, discloses, and protects the personal information you provide through our website, marketing communications, and advisory services. By using our website or engaging Varick Global, you agree to the practices described below.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">1. Information We Collect</h2>
  <p>We collect personal information you provide directly to us, including name, email, phone number, mailing address, property and transaction details, and any other information you share through forms, scheduled consultations, or correspondence. We may also automatically collect technical information about your visit — IP address, browser type, device identifiers, pages visited, and referring URLs — via standard analytics tools.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">2. How We Use Information</h2>
  <ul style="padding-left:20px;margin:0 0 16px;">
    <li>Deliver advisory, listing, transaction, and valuation services you request.</li>
    <li>Respond to inquiries, schedule consultations, and provide market updates.</li>
    <li>Improve the website experience, security, and analytics.</li>
    <li>Comply with legal, regulatory, and brokerage-licensure obligations.</li>
    <li>Send relevant marketing where you have opted in (you may opt out at any time).</li>
  </ul>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">3. How We Share Information</h2>
  <p>We do not sell your personal information. We may share it with: (a) trusted service providers who help us operate our business (e.g., email, analytics, CRM) under written confidentiality obligations; (b) co-brokers, attorneys, lenders, title companies, and other transaction parties strictly as necessary to advance a transaction you have engaged us on; and (c) authorities when required by law, subpoena, or to protect legal rights.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">4. Cookies & Analytics</h2>
  <p>Our website uses cookies and similar technologies to remember preferences, measure traffic, and improve site performance. You can control cookies through your browser settings; disabling them may affect certain features. We may use Google Analytics or comparable services to understand aggregate visitor behavior.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">5. Data Retention & Security</h2>
  <p>We retain personal information only for as long as needed to deliver our services and meet legal obligations. We employ reasonable administrative, technical, and physical safeguards to protect information against loss, misuse, or unauthorized access. No method of transmission over the Internet is 100% secure; we cannot guarantee absolute security.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">6. Your Rights</h2>
  <p>Depending on your jurisdiction, you may have the right to access, correct, delete, or restrict use of your personal information, to opt out of marketing communications, and to lodge a complaint with a data-protection authority. To exercise these rights, contact us at <a href="mailto:privacy@varickglobal.com" style="color:#d2203a;">privacy@varickglobal.com</a>.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">7. Children's Privacy</h2>
  <p>Our services are intended for users 18 and older. We do not knowingly collect information from children. If you believe a child has provided us information, please contact us and we will delete it.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">8. Changes to This Policy</h2>
  <p>We may update this Privacy Policy from time to time. The "Effective Date" above reflects the most recent version. Material changes will be posted on this page; continued use of our services constitutes acceptance of the revised policy.</p>

  <h2 style="font-family:'Cormorant Garamond',serif;font-weight:300;font-size:32px;color:#fff;margin:48px 0 16px;">9. Contact Us</h2>
  <p style="margin-bottom:0;">Varick Global Real Estate Advisors<br/>
  19505 Biscayne Blvd, Suite 2350<br/>
  Aventura, FL 33180<br/>
  <a href="tel:+17863527547" style="color:#d2203a;">786.352.7547</a> &middot; <a href="mailto:privacy@varickglobal.com" style="color:#d2203a;">privacy@varickglobal.com</a></p>
</div>`,
        }),
      ],
    }),
  ];
};
