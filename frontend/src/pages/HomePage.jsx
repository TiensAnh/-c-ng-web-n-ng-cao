import usePageTitle from '../hooks/usePageTitle';
import { homeContent } from '../services/siteContentService';
import HomeHeroSection from '../components/sections/HomeHeroSection';
import HomePromotionsSection from '../components/sections/HomePromotionsSection';
import HomeNewsletterSection from '../components/sections/HomeNewsletterSection';

function HomePage() {
  usePageTitle('ADN Travel | Trang chủ');

  return (
    <>
      <HomeHeroSection hero={homeContent.hero} />
      <HomePromotionsSection promotions={homeContent.promotions} />
      <HomeNewsletterSection newsletter={homeContent.newsletter} />
    </>
  );
}

export default HomePage;
