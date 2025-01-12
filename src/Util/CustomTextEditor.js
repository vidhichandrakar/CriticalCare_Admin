// CustomTextEditor.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import TextField from '@mui/material/TextField';

const CustomTextEditor = ({ value = '', onChange, placeholder = 'Enter text...', style }) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content) => {
    setEditorValue(content);
    // if (onChange) {
    //   onChange(content); // Pass the updated content to the parent component
    // }
  };

  return (
    // <ReactQuill
    //   value={editorValue}
    //   onChange={handleChange}
    //   placeholder={placeholder}
    //   modules={{
    //     toolbar: [
    //       [{ header: '1' }, { header: '2' }, { font: [] }],
    //       [{ list: 'ordered' }, { list: 'bullet' }],
    //       ['bold', 'italic', 'underline', 'strike'],
    //       ['link', 'image'],
    //     ],
    //   }}
    //   style={{ style }}
    // />
    <TextField fullWidth label="fullWidth" id="fullWidth"  value={editorValue}
    onChange={handleChange} placeholder={placeholder}/>
  );
};

export default CustomTextEditor;
