import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Input, Select, Textarea, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { siteConfig, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Contact Varick Global",
  description:
    "Speak with a Varick Global advisor. Aventura HQ — Miami-Dade, Broward and Palm Beach.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start the conversation"
        italicWord="conversation"
        subtitle="Tell us about your brief. A senior advisor will reach out within one business day."
      />

      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Card>
                <form className="space-y-5" action={`mailto:${siteConfig.email}`} method="post" encType="text/plain">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input required name="firstName" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input required name="lastName" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Email</Label>
                      <Input required type="email" name="email" />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input name="phone" />
                    </div>
                  </div>
                  <div>
                    <Label>I am interested in</Label>
                    <Select name="interest" defaultValue="Buying">
                      <option>Buying</option>
                      <option>Selling</option>
                      <option>Leasing</option>
                      <option>Commercial</option>
                      <option>HOA Advisory</option>
                      <option>VG Elite</option>
                      <option>Investment Sales</option>
                      <option>Valuation</option>
                    </Select>
                  </div>
                  <div>
                    <Label>How can we help?</Label>
                    <Textarea name="message" placeholder="Tell us about your brief…" />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>

            <aside className="lg:col-span-5 space-y-5">
              <Card>
                <div className="eyebrow mb-5">Headquarters</div>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-vg-vivid mt-1 shrink-0" />
                    <span className="text-white">
                      19505 Biscayne Blvd, Suite 2350
                      <br />
                      Aventura, FL 33180
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-vg-vivid shrink-0" />
                    <a href={`tel:${siteConfig.phone}`} className="text-white hover:text-vg-vivid">
                      {siteConfig.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-vg-vivid shrink-0" />
                    <a href={`mailto:${siteConfig.email}`} className="text-white hover:text-vg-vivid">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-vg-vivid mt-1 shrink-0" />
                    <span className="text-white">
                      Monday – Friday · 9:00 to 18:00
                      <br />
                      <span className="text-vg-pewter">Weekends by appointment</span>
                    </span>
                  </li>
                </ul>
              </Card>

              <Card>
                <div className="eyebrow mb-4">Service Area</div>
                <p className="text-vg-pewter text-sm leading-relaxed">
                  We serve clients across Miami-Dade, Broward and Palm Beach counties — and
                  globally for the VG Elite division.
                </p>
              </Card>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
