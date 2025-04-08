
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchNoticeById, deleteNotice } from '../services/noticeService';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';

const NoticeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteNotice(id);
      if (response.success) {
        toast.success('Notice deleted successfully');
        navigate('/notices');
      } else {
        toast.error(response.message || 'Failed to delete notice');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('Failed to delete notice');
    }
    setShowModal(false);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'pdf':
        return 'fas fa-file-pdf text-red-500';
      case 'doc':
        return 'fas fa-file-word text-blue-500';
      case 'image':
        return 'fas fa-file-image text-green-500';
      default:
        return 'fas fa-file text-gray-500';
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
        <Link to="/notices" className="text-blue-600 hover:underline flex items-center">
          <i className="fas fa-arrow-left mr-2"></i> Back to Notices
        </Link>
        <div className="space-x-2">
          <Link to={`/notices/${id}/edit`} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Edit
          </Link>
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl font-bold">{notice.title}</h1>
            {notice.isImportant && (
              <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full uppercase font-semibold">
                Important
              </span>
            )}
          </div>
          
          <div className="mb-4 text-sm text-gray-500">
            <p>Category: {notice.category}</p>
            <p>Created: {new Date(notice.createdAt).toLocaleString()}</p>
            {notice.updatedAt !== notice.createdAt && (
              <p>Updated: {new Date(notice.updatedAt).toLocaleString()}</p>
            )}
          </div>

          <div className="prose max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: notice.content }} />
          </div>

          {notice.files && notice.files.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Attachments</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notice.files.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 border rounded hover:bg-gray-50"
                  >
                    <i className={`${getFileIcon(file.fileType)} text-xl mr-3`}></i>
                    <div>
                      <p className="text-sm font-medium truncate w-full" title={file.originalName}>
                        {file.originalName}
                      </p>
                      <p className="text-xs text-gray-500">{file.fileType.toUpperCase()}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmDelete}
        title="Confirm Delete"
        message="Are you sure you want to delete this notice? This action cannot be undone."
      />
    </div>
  );
};

export default NoticeDetails;