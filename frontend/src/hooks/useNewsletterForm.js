import { useState } from 'react';
import { subscribeToNewsletter } from '../services/public/siteContentService';

function useNewsletterForm(source) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Vui lòng nhập email hợp lệ để nhận ưu đãi.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await subscribeToNewsletter({ email, source });
      setStatus('success');
      setMessage(response.message);
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error.message || 'Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return {
    email,
    message,
    setEmail,
    status,
    handleSubmit,
  };
}

export default useNewsletterForm;
