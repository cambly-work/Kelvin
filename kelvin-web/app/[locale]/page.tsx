import { setRequestLocale } from "next-intl/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Compare from "@/components/Compare";
import Showcase from "@/components/Showcase";
import Pricing from "@/components/Pricing";
import Privacy from "@/components/Privacy";
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
      <main className="flex-1">
        <Hero />
        <Features />
        <Compare />
        <Showcase />
        <Pricing />
        <Privacy />
        <Faq />
        <Download />
      </main>
      <Footer />
    </>
  );
}
