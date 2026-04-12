import { useState } from 'react';
import FaqItem from '../cards/FaqItem';
import SectionHeading from '../../../shared/components/SectionHeading';

function ContactFaqSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="contact-faq section-block">
      <div className="content-container">
        <SectionHeading
          title="Câu hỏi thường gặp"
          description="Tìm kiếm nhanh câu trả lời cho các thắc mắc phổ biến về dịch vụ tại ADN Travel."
          action={
            <button className="button button--secondary" type="button">
              Xem tất cả FAQ
            </button>
          }
        />

        <div className="contact-faq__grid">
          {faqs.map((faq, index) => (
            <FaqItem
              key={faq.question}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ContactFaqSection;
