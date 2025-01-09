import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

function Paragraph({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('text-md leading-7', className)} {...props} />;
}

export default function SectionHistory() {
  return (
    <section className="border-b px-6 pb-24">
      <div className="container">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h2 className="mb-8">Obraćanje direktora</h2>
          </div>
          <div className="mx-auto text-center">
            <div className="space-y-3">
              <Paragraph>
                Zgrada Gimnazije je <span className="text-primary-50 dark:text-primary">izgrađena 1901. godine</span> u
                pseudo-maurskom stilu.
                <br />
                Projektant je bio arhitekta Miloš Komadina. Prvobitna namjena joj je bila općinska zgrada.
              </Paragraph>
              <Paragraph>
                Kasnije je bila Carska i kraljevska vojna pošta i telegraf, Razdjel finansijske straže, Čitaonica,
                Kotarski ured Bugojno, Kasarna. Prvi pokušaj otvaranja gimnazije je bio{' '}
                <span className="text-primary-50 dark:text-primary">1924. godine</span>. Odlukom Vlade za Bosnu i
                Hercegovinu broj:8636/45 od{' '}
                <span className="text-primary-50 dark:text-primary">17.11.1945. godine</span>, osnovana je Državna
                realna gimnazija, a njen utemeljitelj i prvi direktor je bio{' '}
                <span className="text-primary-50 dark:text-primary">Fehim Efendić</span>.
              </Paragraph>
              <Paragraph>
                <span className="text-primary-50 dark:text-primary">10.01.1946. godine</span> je otvorena i počela je
                nastava sa dva odjeljenja prvih razreda. Nekada se zvala Centar za srednjoškolsko obrazovanje{' '}
                <span className="text-primary-50 dark:text-primary">„Mahmut Bušatlija“</span>, potom Gimnazija Bugojno,
                pa Mješovita srednja škola Bugojno, a od ove školske godine (2023./2024.) nosi naziv{' '}
                <span className="text-primary-50 dark:text-primary">MSŠ „Gimnazija Bugojno“</span>.
              </Paragraph>
              <Paragraph>
                Trenutno broji <span className="text-primary-50 dark:text-primary">24 odjeljenja</span>; 12 odjeljenja
                opće gimnazije i 12 odjeljenja medicinske struke- smjer medicinska sestra/tehničar. Gimnazija je odavno
                postala brend grada Bugojna, a kroz nju su prošli mnogi danas{' '}
                <span className="text-primary-50 dark:text-primary">znameniti ljudi</span>: doktori nauka, naučnici,
                ljekari, profesori, inženjeri, umjetnici i ostali koji danas obavljaju poslove u Bosni i Hercegovini, te
                u mnogim zemljama širom svijeta.
              </Paragraph>
            </div>
            <Paragraph className="mt-8 text-lg font-bold">
              Direktor škole: <span className="text-primary-50 dark:text-primary">Nedžad Milanović, prof.</span>
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
}
