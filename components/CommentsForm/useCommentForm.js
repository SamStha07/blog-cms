import React, { useState, useEffect } from 'react';
import { submitComment } from '../../services';

const useCommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    storeData: false,
  });

  // will fill the form using data from localStorage
  useEffect(() => {
    setLocalStorage(window.localStorage);
    const initalFormData = {
      name: window.localStorage.getItem('name'),
      email: window.localStorage.getItem('email'),
      storeData:
        window.localStorage.getItem('name') ||
        window.localStorage.getItem('email'),
    };
    setFormData(initalFormData);
  }, [setFormData, setLocalStorage]);

  const onInputChange = (e) => {
    const { target } = e;
    if (target.type === 'checkbox') {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }
  };

  const handleCommentSubmission = (e) => {
    e.preventDefault();
    setError(false);

    const { name, email, comment, storeData } = formData;

    if (!name || !email || !comment) {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if (storeData) {
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('email', email);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj).then((res) => {
      if (res.createComment) {
        if (!storeData) {
          formData.name = '';
          formData.email = '';
        }
        formData.comment = '';
        setFormData((prevState) => ({
          ...prevState,
          ...formData,
        }));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      }
    });
  };

  return {
    error,
    showSuccessMessage,
    formData,
    setFormData,
    setError,
    setShowSuccessMessage,
    onInputChange,
    setLocalStorage,
    handleCommentSubmission,
  };
};

export default useCommentForm;
