import React, { useState, useRef } from 'react';

const UploadSection = ({ currentLang, translations, onImageUpload }) => {
  const t = translations[currentLang];
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [highlight, setHighlight] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert(t.errorSize);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setHighlight(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert(t.errorSize);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
        onImageUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="upload-section">
      <h2>{t.uploadTitle}</h2>
      <div 
        className={`upload-area ${highlight ? 'highlight' : ''}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewImage ? (
          <img 
            src={previewImage} 
            alt="Preview" 
            style={{ display: 'block', maxWidth: '100%', maxHeight: '300px' }} 
          />
        ) : (
          <div className="upload-placeholder">
            <img src="/images/upload-icon.png" alt="Upload" />
            <p dangerouslySetInnerHTML={{ __html: t.dropText }}></p>
          </div>
        )}
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*" 
          hidden
        />
      </div>
      <p className="helper-text">{t.fileTypes}</p>
    </section>
  );
};

export default UploadSection; 