import Guides from "@/components/Guides";
import { release } from "@/lib/release";
import { requireLocale, pageUrl, siteOrigin, languageTags } from "@/lib/seo";
import { setRequestLocale, getTranslations } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import ProductDemo from "@/components/ProductDemo";
import ProductExplorer from "@/components/ProductExplorer";
import EngineeringStory from "@/components/EngineeringStory";
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
  const validLocale = requireLocale(locale);
  setRequestLocale(validLocale);
  const t = await getTranslations({ locale: validLocale, namespace: "Meta" });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl(validLocale)}#software`,
    name: "Kelvin",
    description: t("description"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: `macOS ${release.minOS} or later`,
    url: pageUrl(validLocale),
    inLanguage: languageTags[validLocale],
    ...(release.downloadUrl ? { downloadUrl: release.downloadUrl } : {}),
    softwareVersion: release.version,
    isAccessibleForFree: true,
    image: `${siteOrigin}/assets/icon.png`,
    offers: [{ "@type": "Offer", price: "0", priceCurrency: "USD", name: "Kelvin", url: `${pageUrl(validLocale)}#download` }],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <SocialProof />
        <ProductDemo locale={locale} />
        <ProductExplorer locale={locale} />
        <EngineeringStory locale={locale} />
        <Pricing />
        <Trust />
        <Guides locale={validLocale} />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
