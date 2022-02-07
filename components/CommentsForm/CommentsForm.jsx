import React from 'react';
import useCommentForm from './useCommentForm';

const CommentsForm = ({ slug }) => {
  const {
    formData,
    setFormData,
    onInputChange,
    error,
    setError,
    setShowSuccessMessage,
    showSuccessMessage,
    setLocalStorage,
    handleCommentSubmission,
  } = useCommentForm({ slug });

  return (
    <div className='p-8 pb-12 mb-8 bg-white rounded-lg shadow-lg'>
      <h3 className='pb-4 mb-8 text-xl font-semibold border-b'>
        Leave a Reply
      </h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea
          value={formData.comment}
          onChange={onInputChange}
          className='w-full h-40 p-4 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
          name='comment'
          placeholder='Comment'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2'>
        <input
          type='text'
          value={formData.name}
          onChange={onInputChange}
          className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
          placeholder='Name'
          name='name'
        />
        <input
          value={formData.email}
          onChange={onInputChange}
          type='email'
          className='w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-gray-200'
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
          <input
            value={formData.storeData}
            onChange={onInputChange}
            type='checkbox'
            id='storeData'
            name='storeData'
          />
          <label
            className='ml-2 text-gray-500 cursor-pointer'
            htmlFor='storeData'
          >
            Save my name, email in this browser for the next time I comment.
          </label>
        </div>
      </div>
      {error && (
        <p className='text-xs text-red-500'>All fields are mandatory</p>
      )}
      <div className='mt-8'>
        <button
          type='button'
          onClick={handleCommentSubmission}
          className='inline-block px-8 py-3 text-lg font-medium text-white transition duration-500 bg-pink-600 rounded-full cursor-pointer ease hover:bg-indigo-900'
        >
          Post Comment
        </button>
        {showSuccessMessage && (
          <span className='float-right mt-3 text-xl font-semibold text-green-500'>
            Comment submitted for review
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentsForm;
