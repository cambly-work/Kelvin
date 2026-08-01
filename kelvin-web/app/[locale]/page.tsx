import { setRequestLocale } from "next-intl/server";
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
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero />
        <SocialProof />
        <ProductDemo locale={locale} />
        <ProductExplorer locale={locale} />
        <EngineeringStory locale={locale} />
        <Pricing />
        <Trust />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
