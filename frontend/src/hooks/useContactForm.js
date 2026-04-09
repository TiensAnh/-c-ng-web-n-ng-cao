import { useState } from 'react';
import { submitContactForm } from '../services/public/siteContentService';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

function useContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasEmptyField = Object.values(formData).some((value) => !value.trim());
    if (hasEmptyField) {
      setStatus('error');
      setFeedback('Vui lòng điền đầy đủ thông tin để ADN Travel hỗ trợ bạn.');
      return;
    }

    setStatus('submitting');

    try {
      const response = await submitContactForm(formData);
      setStatus('success');
      setFeedback(response.message);
      setFormData(initialFormState);
    } catch (error) {
      setStatus('error');
      setFeedback(error.message || 'Không thể gửi liên hệ lúc này. Vui lòng thử lại.');
    }
  };

  return {
    feedback,
    formData,
    handleChange,
    handleSubmit,
    status,
  };
}

export default useContactForm;
