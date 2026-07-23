import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProductDemo from "@/components/ProductDemo";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import Trust from "@/components/Trust";
import Faq from "@/components/Faq";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Kelvin",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "macOS 11 or later",
    url: `https://trykelvin.com/${locale}`,
    downloadUrl: "https://trykelvin.com/Kelvin-0.9.0.dmg",
    image: "https://trykelvin.com/assets/og-v2.png",
    offers: [
      { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Kelvin Free" },
      { "@type": "Offer", price: "19", priceCurrency: "USD", name: "Kelvin Pro" },
    ],
  };

  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Hero />
        <SocialProof />
        <ProductDemo locale={locale} />
        <Features locale={locale} />
        <Pricing />
        <Trust />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
