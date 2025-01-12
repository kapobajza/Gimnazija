import { useRouteError } from "react-router";

import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Footer from "@/components/layout/footer";
import {
  AppErrorCode,
  appErrorSchema,
  httpErrorSchema,
} from "@/networking/error";

function getErrorSummary(error: unknown): {
  title: string;
  subtitle: string;
} {
  const appError = appErrorSchema.safeParse(error);

  if (appError.success && appError.data.code === AppErrorCode.POST_NOT_FOUND) {
    return {
      title: "Vijest nije pronađena",
      subtitle: "Vijest ne postoji ili je izbrisana.",
    };
  }

  const responseError = httpErrorSchema.safeParse(error);

  if (responseError.success && responseError.data.status === 404) {
    return {
      title: "Stranica nije pronađena!",
      subtitle:
        "Stranica koju ste tražili je premještena, izbrisana ili nije nikad ni postojala.",
    };
  }

  return {
    title: "Nepoznata greška",
    subtitle: "Nepoznata greška prilikom učitavanja aplikacije.",
  };
}

export default function RouteError() {
  const error = useRouteError();
  const { title, subtitle } = getErrorSummary(error);

  return (
    <>
      <Header />
      <main className="relative">
        <section className="mt-[88px] bg-muted py-32 dark:bg-slate-900 lg:mt-[112px]">
          <div className="container text-center">
            <img
              src="/not_found.png"
              width={340}
              height={340}
              alt="not found"
              className="mb-12 inline-block"
            />
            <h1 className="mb-4">{title}</h1>
            <p className="mb-12">{subtitle}</p>
            <Button size="lg" asChild>
              <a href="/">Idi na početnu</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
