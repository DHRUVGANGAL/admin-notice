
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchNoticeById, updateNotice } from '../services/noticeService';
import { toast } from 'react-toastify';
import NoticeForm from './NoticeForm';

const EditNotice = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadNotice = async () => {
      try {
        const response = await fetchNoticeById(id);
        if (response.success) {
          setNotice(response.notice);
        } else {
          toast.error(response.message || 'Failed to load notice');
          navigate('/notices');
        }
      } catch (error) {
        console.error('Error loading notice:', error);
        toast.error('Failed to load notice');
        navigate('/notices');
      } finally {
        setLoading(false);
      }
    };

    loadNotice();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const response = await updateNotice(id, formData);
      if (response.success) {
        toast.success('Notice updated successfully');
        navigate(`/notices/${id}`);
      } else {
        toast.error(response.message || 'Failed to update notice');
      }
    } catch (error) {
      console.error('Error updating notice:', error);
      toast.error('Failed to update notice');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center mt-20"><div className="loader"></div></div>;
  }

  if (!notice) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-500">Notice not found.</p>
        <Link to="/notices" className="text-blue-600 hover:underline mt-2 inline-block">
          Back to Notices
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Edit Notice</h1>
        <Link to={`/notices/${id}`} className="text-blue-600 hover:underline">
          Cancel
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <NoticeForm 
            initialValues={notice} 
            onSubmit={handleSubmit} 
            loading={submitting}
            isEditing={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditNotice;