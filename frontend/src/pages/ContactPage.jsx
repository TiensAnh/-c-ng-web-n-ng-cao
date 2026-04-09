import ContactDetailsSection from '../components/sections/ContactDetailsSection';
import ContactFaqSection from '../components/sections/ContactFaqSection';
import ContactHeroSection from '../components/sections/ContactHeroSection';
import ContactNewsletterSection from '../components/sections/ContactNewsletterSection';
import usePageTitle from '../hooks/usePageTitle';
import { contactContent } from '../services/siteContentService';

function ContactPage() {
  usePageTitle('ADN Travel | Liên hệ');

  return (
    <>
      <ContactHeroSection hero={contactContent.hero} />
      <ContactDetailsSection
        information={contactContent.information}
        mapCard={contactContent.mapCard}
      />
      <ContactFaqSection faqs={contactContent.faqs} />
      <ContactNewsletterSection newsletter={contactContent.newsletter} />
    </>
  );
}

export default ContactPage;
