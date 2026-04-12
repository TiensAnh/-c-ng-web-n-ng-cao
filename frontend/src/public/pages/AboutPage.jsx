import AboutCtaSection from '../components/sections/AboutCtaSection';
import AboutHeroSection from '../components/sections/AboutHeroSection';
import AboutMissionSection from '../components/sections/AboutMissionSection';
import AboutStatsSection from '../components/sections/AboutStatsSection';
import AboutTeamSection from '../components/sections/AboutTeamSection';
import AboutWhyChooseSection from '../components/sections/AboutWhyChooseSection';
import usePageTitle from '../../shared/hooks/usePageTitle';
import { aboutContent } from '../services/siteContentService';

function AboutPage() {
  usePageTitle('ADN Travel | Về chúng tôi');

  return (
    <>
      <AboutHeroSection hero={aboutContent.hero} />
      <AboutMissionSection mission={aboutContent.mission} values={aboutContent.values} />
      <AboutWhyChooseSection whyChoose={aboutContent.whyChoose} />
      <AboutStatsSection stats={aboutContent.stats} />
      <AboutTeamSection team={aboutContent.team} />
      <AboutCtaSection cta={aboutContent.cta} />
    </>
  );
}

export default AboutPage;
