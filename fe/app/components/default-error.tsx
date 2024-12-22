import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import FooterLayout from '@/components/layout/footer-layout';

export default function DefaultError({
  title = 'Stranica nije pronađena!',
  subtitle,
}: {
  title?: string;
  subtitle: string;
}) {
  return (
    <>
      <Header />
      <main className="relative">
        <section className="bg-muted py-32 dark:bg-slate-900 mt-[88px] lg:mt-[112px]">
          <div className="container text-center">
            <img src="/not_found.png" width={340} height={340} alt="not found" className="mb-12 inline-block" />
            <h1 className="mb-4">{title}</h1>
            <p className="mb-12">{subtitle}</p>
            <Button size="lg" asChild>
              <a href="/">Idi na početnu</a>
            </Button>
          </div>
        </section>
      </main>
      <FooterLayout />
    </>
  );
}
