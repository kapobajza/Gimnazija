import Header from '@/components/layout/header';
import SectionPageTitle from '@/components/sections/section-page-title';
import FooterLayout from '@/components/layout/footer-layout';
import StaffCard from './components/staff-card';
import { TEAM_DATA } from './data';
import { MetaFunction } from 'react-router';
import { generateCommonMetaTags } from '@/lib/utils';

export const meta: MetaFunction = () => {
  return generateCommonMetaTags({
    title: 'Naši uposlenici',
    description: 'Uposlenici MSŠ Gimnazije Bugojno',
  });
};

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main className="relative">
        <SectionPageTitle subtitle="Predani uposlenici koji svojim radom oblikuju obrazovanje i stvaraju inspirativno okruženje za učenike. Svaki član tima doprinosi uspjehu škole i budućim generacijama lidera.">
          Naši uposlenici
        </SectionPageTitle>
        <section className="border-b py-24">
          <div className="container">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {TEAM_DATA.map((member) => (
                <StaffCard member={member} key={`${member.name}-${member.image}`} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <FooterLayout />
    </>
  );
}
