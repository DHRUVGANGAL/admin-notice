
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createNotice } from '../services/noticeService';
import { toast } from 'react-toastify';
import NoticeForm from './NoticeForm';

const CreateNotice = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await createNotice(formData);
      
      
      if (response.notice || response.token || response._id) {
        toast.success('Notice created successfully');
        navigate(`/notices`);
      } else {
        toast.error(response.message || 'Failed to create notice');
      }
    } catch (error) {
      console.error('Error creating notice:', error);
      toast.error('Failed to create notice');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create Notice</h1>
        <Link to="/notices" className="text-blue-600 hover:underline">
          Back to Notices
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <NoticeForm onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default CreateNotice;