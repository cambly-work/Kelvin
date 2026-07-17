import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main" className="flex-1">
      <div className="mx-auto max-w-[980px] px-5 pt-40 text-center">
        <h1 className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold tracking-[-0.03em] text-tx">
          Kelvin
        </h1>
        <p className="mx-auto mt-4 max-w-[520px] text-mut">
          Rebuild in progress.
        </p>
      </div>
    </main>
  );
}
