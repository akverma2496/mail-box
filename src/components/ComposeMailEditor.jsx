import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ComposeMailEditor = ({ value, setValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%', // Ensure the parent container fills its available height
      }}
    >
      {/* Title */}
      <label className="form-label fw-semibold">Message</label>

      {/* ReactQuill editor container */}
      <ReactQuill
        value={value}
        onChange={setValue}
        theme="snow"
        modules={modules}
        style={{
          height: 'auto', // Let ReactQuill's height grow with content
          flex: 1, // This ensures it expands with the content
          marginBottom: '10px', // Optional: Margin between editor and form
        }}
      />
    </div>
  );
};

export default ComposeMailEditor;
