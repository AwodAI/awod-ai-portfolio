import type { Metadata } from "next";
import Link from "next/link";
import { CalendlyInline } from "@/components/calendly-inline";
import { CollaborationFitSection } from "@/components/collaboration-fit-section";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About & Booking",
  description:
    "Awedis Mosoyan — AI creative production based in Berlin. Learn about the work and book a call directly.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <main className="page-top page-theme-contact">

        {/* WHO I AM */}
        <section className="section guided-section guided-start about-intro-section">
          <div className="shell page-hero about-intro-layout">
            <div className="about-intro-copy">
              <p className="home-chapter-tag">Chapter 01</p>
              <p className="section-kicker">About</p>
              <h1 className="section-title">I build work that people remember.</h1>
              <p className="section-copy">
                AWOD.AI is focused on clear visual storytelling, solid craft,
                and outputs that are usable in real campaigns.
              </p>
              <div className="about-profile-strip" aria-label="Founder profile highlights">
                <span>B.Sc. in Business Administration (Digital Economy)</span>
                <span>Based in Berlin</span>
                <span>Founder-led from first brief to final delivery</span>
              </div>
            </div>
            <div className="about-portrait-frame" aria-label="Portrait frame placeholder">
              <div className="about-portrait-placeholder" role="img" aria-label="Reserved founder portrait area">
                <span className="about-portrait-label">Founder Portrait</span>
                <span className="about-portrait-hint">4:5 vertical recommended</span>
              </div>
            </div>
          </div>
        </section>

        {/* COLLABORATION FIT */}
        <CollaborationFitSection />

        {/* BOOKING */}
        <section className="section guided-section contact-calendly-section" id="booking-inline">
          <div className="shell">
            <p className="home-chapter-tag">Chapter 03</p>
            <p className="section-kicker">Booking</p>
            <h2 className="section-title">Book a Call</h2>
            <p className="section-copy">
              Book a discovery or strategy call. We align on goals, required
              deliverables, and timeline before project start.
            </p>
            <div className="hero-cta-row">
              <a className="button-secondary booking-email-button" href={`mailto:${site.email}`}>
                Email Directly
              </a>
            </div>
            <CalendlyInline url={site.calendlyUrl} />
          </div>
        </section>

        {/* CTA */}
        <section className="section guided-section guided-end contact-cta-section">
          <div className="shell cta-band">
            <div>
              <p className="home-chapter-tag">Chapter 04</p>
              <p className="section-kicker">Next Step</p>
              <h2 className="section-title">Ready to start a project?</h2>
            </div>
            <Link className="button-primary" href="#booking-inline">
              Jump to Booking Calendar
            </Link>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
