import React from 'react';

const LanguageToggle = ({ currentLang, onLanguageChange }) => {
  const isEnglish = currentLang === 'en';
  
  return (
    <div className="language-toggle">
      <span 
        className="lang-label" 
        id="lang-ja" 
        style={{ 
          color: !isEnglish ? 'var(--primary-color)' : '#999',
          fontWeight: !isEnglish ? 'bold' : 'normal'
        }}
        onClick={() => onLanguageChange('ja')}
      >
        日本語
      </span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isEnglish}
          onChange={(e) => onLanguageChange(e.target.checked ? 'en' : 'ja')}
        />
        <span className="slider round"></span>
      </label>
      <span 
        className="lang-label" 
        id="lang-en"
        style={{ 
          color: isEnglish ? 'var(--accent-color)' : '#999',
          fontWeight: isEnglish ? 'bold' : 'normal'
        }}
        onClick={() => onLanguageChange('en')}
      >
        English
      </span>
    </div>
  );
};

export default LanguageToggle; 