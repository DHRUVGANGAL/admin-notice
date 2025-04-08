

import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const NoticeForm = ({ initialValues = {}, onSubmit, loading, isEditing = false }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [content, setContent] = useState(initialValues.content || '');
  const [category, setCategory] = useState(initialValues.category || 'General');
  const [isImportant, setIsImportant] = useState(initialValues.isImportant || false);
  const [expiryDate, setExpiryDate] = useState(initialValues.expiryDate ? new Date(initialValues.expiryDate).toISOString().split('T')[0] : '');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [existingFiles, setExistingFiles] = useState(initialValues.files || []);
  const [filesToKeep, setFilesToKeep] = useState(initialValues.files ? initialValues.files.map(file => file._id) : []);
  const [removeAllFiles, setRemoveAllFiles] = useState(false);
  
  const fileInputRef = useRef();

  const categories = [
    'General',
    'Academic',
    'Administrative',
    'Events',
    'Examinations',
    'Scholarships',
    'Others'
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    console.log('Selected files:', selectedFiles);
    setUploadedFiles(selectedFiles);
  };

  const handleExistingFileToggle = (fileId) => {
    if (filesToKeep.includes(fileId)) {
      setFilesToKeep(filesToKeep.filter(id => id !== fileId));
    } else {
      setFilesToKeep([...filesToKeep, fileId]);
    }
  };

  const handleRemoveAllFilesChange = (e) => {
    const checked = e.target.checked;
    setRemoveAllFiles(checked);
    if (checked) {
      setFilesToKeep([]);
    } else {
      setFilesToKeep(initialValues.files ? initialValues.files.map(file => file._id) : []);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('Title is required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('isImportant', isImportant);
    
    if (expiryDate) {
      formData.append('expiryDate', expiryDate);
    }

    if (isEditing) {
      // For editing existing notice
      if (removeAllFiles) {
        formData.append('removeAllFiles', 'true');
      } else if (existingFiles.length > 0) {
        filesToKeep.forEach(fileId => {
          formData.append('keepFiles[]', fileId);
        });
      }
    }

    // Append new files
    uploadedFiles.forEach(file => {
      formData.append('files', file);
    });
    
    console.log("Files in FormData:", uploadedFiles);
for (let pair of formData.entries()) {
  console.log(pair[0] + ': ' + (pair[0] === 'files' ? 'File object' : pair[1]));
}

    onSubmit(formData);
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <Editor
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help'
              }}
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isImportant"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isImportant" className="ml-2 block text-sm text-gray-700">
            Mark as important
          </label>
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date (Optional)
          </label>
          <input
            type="date"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="mt-1 block w-full"
          />
          <p className="mt-1 text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
          </p>
          <div className="mt-2">
            {uploadedFiles.length > 0 && (
              <div className="mt-2">
                <p className="font-medium text-sm">Selected files:</p>
                <ul className="list-disc pl-5 text-sm">
                  {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {isEditing && existingFiles.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Existing Files</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="removeAllFiles"
                  checked={removeAllFiles}
                  onChange={handleRemoveAllFilesChange}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label htmlFor="removeAllFiles" className="ml-2 block text-sm text-gray-700">
                  Remove all files
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              {existingFiles.map((file) => (
                <div 
                  key={file._id} 
                  className={`border rounded-md p-3 flex items-center justify-between ${
                    filesToKeep.includes(file._id) ? 'bg-blue-50' : 'bg-red-50'
                  }`}
                >
                  <div className="flex items-center">
                    <i className={`${getFileIcon(file.fileType)} text-lg mr-2`}></i>
                    <span className="text-sm truncate max-w-xs" title={file.originalName}>
                      {file.originalName}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={filesToKeep.includes(file._id)}
                    onChange={() => handleExistingFileToggle(file._id)}
                    disabled={removeAllFiles}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <span>
                <i className="fas fa-spinner fa-spin mr-2"></i>
                {isEditing ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              <span>{isEditing ? 'Update Notice' : 'Create Notice'}</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NoticeForm;