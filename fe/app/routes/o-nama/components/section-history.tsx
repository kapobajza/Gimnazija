import { cn } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';

function Paragraph({ className, ...props }: ComponentPropsWithoutRef<'p'>) {
  return <p className={cn('text-md', className)} {...props} />;
}

export default function SectionHistory() {
  return (
    <section className="px-6 pb-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="mb-8">Kratka historija o našoj školi</h2>
          </div>
          <div className="text-center max-w-[720px] mx-auto">
            <div className="space-y-3">
              <Paragraph>
                Zgrada Gimnazije je <span className="text-primary">izgrađena 1901. godine</span> u pseudo-maurskom
                stilu.
              </Paragraph>
              <Paragraph>Projektant je bio arhitekta Miloš Komadina.</Paragraph>
              <Paragraph>Prvobitna namjena joj je bila općinska zgrada.</Paragraph>
              <Paragraph>
                Kasnije je bila Carska i kraljevska vojna pošta i telegraf, Razdjel finansijske straže, Čitaonica,
                Kotarski ured Bugojno, Kasarna.
              </Paragraph>
              <Paragraph>
                Prvi pokušaj otvaranja gimnazije je bio <span className="text-primary">1924. godine.</span>
              </Paragraph>
              <Paragraph>
                Odlukom Vlade za Bosnu i Hercegovinu broj:8636/45 od{' '}
                <span className="text-primary">17.11.1945. godine</span>, osnovana je Državna realna gimnazija, a njen
                utemeljitelj i prvi direktor je bio <span className="text-primary">Fehim Efendić</span>.
              </Paragraph>
              <Paragraph>
                <span className="text-primary">10.01.1946. godine</span> je otvorena i počela je nastava sa dva
                odjeljenja prvih razreda.
              </Paragraph>
              <Paragraph>
                Nekada se zvala Centar za srednjoškolsko obrazovanje{' '}
                <span className="text-primary">„Mahmut Bušatlija“</span>, potom Gimnazija Bugojno, pa Mješovita srednja
                škola Bugojno, a od ove školske godine (2023./2024.) nosi naziv{' '}
                <span className="text-primary">MSŠ „Gimnazija Bugojno“</span>.
              </Paragraph>
              <Paragraph>
                Trenutno broji <span className="text-primary">24 odjeljenja</span>; 12 odjeljenja opće gimnazije i 12
                odjeljenja medicinske struke- smjer medicinska sestra/tehničar.
              </Paragraph>
              <Paragraph>
                Gimnazija je odavno postala brend grada Bugojna, a kroz nju su prošli mnogi danas{' '}
                <span className="text-primary">znameniti ljudi</span>: doktori nauka, naučnici, ljekari, profesori,
                inženjeri, umjetnici i ostali koji danas obavljaju poslove u Bosni i Hercegovini, te u mnogim zemljama
                širom svijeta.
              </Paragraph>
            </div>
            <Paragraph className="text-lg font-bold mt-8">
              Direktor škole: <span className="text-primary">Nedžad Milanović, prof.</span>
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
}
