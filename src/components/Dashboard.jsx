// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchNotices } from '../services/noticeService';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    important: 0,
    recent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetchNotices();
        if (response.success) {
          const notices = response.notices;
          setStats({
            total: notices.length,
            important: notices.filter(notice => notice.isImportant).length,
            recent: notices.slice(0, 5)
          });
        }
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div className="flex justify-center mt-20"><div className="loader"></div></div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Notices</h2>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          <Link to="/notices" className="text-blue-500 hover:underline block mt-4">View All</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Important Notices</h2>
          <p className="text-3xl font-bold text-red-600">{stats.important}</p>
          <Link to="/notices?important=true" className="text-blue-500 hover:underline block mt-4">View Important</Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Actions</h2>
          <div className="space-y-2">
            <Link to="/notices/create" className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Create New Notice
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Notices</h2>
        {stats.recent.length > 0 ? (
          <div className="space-y-4">
            {stats.recent.map(notice => (
              <div key={notice._id} className="border-b pb-3">
                <Link to={`/notices/${notice._id}`} className="text-lg font-medium text-blue-600 hover:underline">
                  {notice.title}
                </Link>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notice.createdAt).toLocaleDateString()}
                  {notice.isImportant && <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs">Important</span>}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No notices available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;