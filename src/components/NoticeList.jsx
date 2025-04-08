

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchNotices, deleteNotice } from '../services/noticeService';
import { toast } from 'react-toastify';
import ConfirmModal from './ConfirmModal';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('important') === 'true') {
      setFilter('important');
    }
  }, [location]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    setLoading(true);
    try {
      const response = await fetchNotices();
      if (response.success) {
        setNotices(response.notices);
      } else {
        toast.error(response.message || 'Failed to load notices');
      }
    } catch (error) {
      console.error('Error loading notices:', error);
      toast.error('Failed to load notices');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteNotice(deleteId);
      if (response.success) {
        toast.success('Notice deleted successfully');
        setNotices(notices.filter(notice => notice._id !== deleteId));
      } else {
        toast.error(response.message || 'Failed to delete notice');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      toast.error('Failed to delete notice');
    }
    setShowModal(false);
    setDeleteId(null);
  };

  const filteredNotices = filter === 'important' 
    ? notices.filter(notice => notice.isImportant)
    : notices;

  if (loading) {
    return <div className="flex justify-center mt-20"><div className="loader"></div></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notices</h1>
        <Link to="/notices/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Create Notice
        </Link>
      </div>

      <div className="mb-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('important')}
            className={`px-4 py-2 rounded ${filter === 'important' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Important Only
          </button>
        </div>
      </div>

      {filteredNotices.length > 0 ? (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attachments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredNotices.map(notice => (
                <tr key={notice._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center">
                          <Link to={`/notices/${notice._id}`} className="hover:text-blue-600">
                            {notice.title}
                          </Link>
                          {notice.isImportant && (
                            <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full">
                              Important
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{notice.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(notice.createdAt).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{notice.files?.length || 0} files</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <Link to={`/notices/${notice._id}`} className="text-blue-600 hover:text-blue-800">
                        View
                      </Link>
                      <Link to={`/notices/${notice._id}/edit`} className="text-green-600 hover:text-green-800">
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(notice._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">No notices found.</p>
          <Link to="/notices/create" className="text-blue-600 hover:underline mt-2 inline-block">
            Create your first notice
          </Link>
        </div>
      )}

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

export default NoticeList;