import { useState } from 'react';
<<<<<<< HEAD
import { subscribeToNewsletter } from '../services/siteContentService';
=======
import { subscribeToNewsletter } from '../services/public/siteContentService';
>>>>>>> 8cf1a3989029571942876b8f0683261f93b85e40

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
