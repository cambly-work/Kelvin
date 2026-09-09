import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["ru", "pt"],
  defaultLocale: "ru",
  localePrefix: "always",
  // Page metadata owns canonical production URLs and pt-BR alternates.
  alternateLinks: false,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
