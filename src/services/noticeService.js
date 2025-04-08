

import { API_URL } from '../config';


const getHeaders = (multipart = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (!multipart) {
    headers['Content-Type'] = 'application/json';
  }
  
  return headers;
};

export const fetchNotices = async () => {
  try {
    const response = await fetch(`${API_URL}/admin/get-notices`, {
      method: 'GET',
      headers: getHeaders()
    });
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const createNotice = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/admin/notices`, {
      method: 'POST',
      headers: getHeaders(true),
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};


export const fetchNoticeById = async (id) => {
  try {
   
    const response = await fetchNotices();
    
    if (response.success && response.notices) {
      const notice = response.notices.find(n => n._id === id);
      return {
        success: !!notice,
        notice: notice || null,
        message: notice ? 'Notice found' : 'Notice not found'
      };
    }
    
    return { success: false, message: response.message || 'Failed to fetch notice' };
  } catch (error) {
    throw error;
  }
};




export const deleteNotice = async (id) => {
  try {
    const response = await fetch(`${API_URL}/admin/delete-notices/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};




export const updateNotice = async (id, formData) => {
  try {
    const response = await fetch(`${API_URL}/admin/update-notices/${id}`, {
      method: 'PUT',
      headers: getHeaders(true),
      body: formData
    });
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};