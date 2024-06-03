// git push  origin texteditor
import React, { useState } from 'react';

// import './TextEditor.css';

const TextEditor = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="text-editor">
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
      {/* <div className="info">
        <p>Word count: {text.split(/\s+/).filter(word => word.length > 0).length}</p>
        <p>Character count: {text.length}</p>
      </div> */}
    </div>
  );
};

export default TextEditor;