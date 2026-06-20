---
title: Contact
eyebrow: Contact
heroHeadline: Start the conversation
heroHeadlineItalic: conversation
heroSubtitle: Tell us about your brief. A senior advisor will reach out within one business day.
interestOptions:
  - Buying
  - Selling
  - Leasing
  - Commercial
  - HOA Advisory
  - VG Elite
  - Investment Sales
  - Valuation
serviceArea: We serve clients across Miami-Dade, Broward and Palm Beach counties — and globally for the VG Elite division.
formEndpoint: /api/lead
successMessage: Thanks — a senior advisor will reach out within one business day.
seo:
  title: Contact Varick Global — Schedule a Consultation
  description: Speak with a senior Varick Global advisor about luxury residential, commercial, HOA, or sports & entertainment real estate in South Florida.
---

# Contact page settings

- `interestOptions` populates the dropdown on the contact form. Add or remove
  items to change what visitors can pick.
- `formEndpoint` is where form submissions POST to. Don't change unless the
  developer says so.
- `successMessage` is shown after a successful submission.

## Where leads go

Every submission to this form is processed by `/api/lead` which:

1. Saves the lead to a Google Sheet (free, no monthly fee)
2. Emails the contactEmail (set in `content/site.md`) immediately
3. (Once configured) pushes the lead into HubSpot as a contact + creates a deal

See `REBOOT_SOP.md` §3 for lead-capture details.
