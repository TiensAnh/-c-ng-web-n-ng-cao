import Button from '../../../shared/components/Button';
import ContactInfoCard from '../cards/ContactInfoCard';
import useContactForm from '../../hooks/useContactForm';

function ContactDetailsSection({ information, mapCard }) {
  const { feedback, formData, handleChange, handleSubmit, status } = useContactForm();

  return (
    <section className="contact-details section-block">
      <div className="content-container contact-details__grid">
        <div className="contact-details__info">
          <ContactInfoCard {...information[0]} wide />

          <div className="contact-details__stack">
            <ContactInfoCard {...information[1]} />
            <ContactInfoCard {...information[2]} />
          </div>

          <article className="contact-map-card">
            <img src={mapCard.image} alt="Bản đồ ADN Travel" />
            <Button className="contact-map-card__button" variant="light">
              <span className="material-symbols-outlined">map</span>
              {mapCard.buttonLabel}
            </Button>
          </article>
        </div>

        <div className="contact-form-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__grid">
              <label>
                <span>Họ và tên</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Nguyễn Văn A"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>

              <label>
                <span>Địa chỉ Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label>
              <span>Số điện thoại</span>
              <input
                name="phone"
                type="tel"
                placeholder="090 1234 567"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label>
              <span>Lời nhắn</span>
              <textarea
                name="message"
                rows="5"
                placeholder="Hãy cho chúng tôi biết yêu cầu của bạn..."
                value={formData.message}
                onChange={handleChange}
              />
            </label>

            <div className="contact-form__actions">
              <Button type="submit">
                {status === 'submitting' ? 'Đang gửi...' : 'Gửi lời nhắn ngay'}
              </Button>
              <p className="contact-form__note">
                Chúng tôi cam kết bảo mật thông tin và sẽ phản hồi trong vòng 24 giờ làm việc.
              </p>
            </div>

            {feedback ? (
              <p className={`form-feedback form-feedback--${status === 'success' ? 'success' : 'error'}`}>
                {feedback}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactDetailsSection;
