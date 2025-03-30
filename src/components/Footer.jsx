import React from 'react';

const Footer = ({ currentLang, translations }) => {
  const t = translations[currentLang];

  return (
    <footer>
      <p>{t.footer}</p>
      
      {/* デバッグ情報 */}
      <div id="debug-info" style={{
        marginTop: '20px',
        padding: '10px',
        background: '#efefef',
        borderRadius: '5px',
        textAlign: 'left',
        fontSize: '12px',
        color: '#333'
      }}>
        <div><strong>ブラウザ情報:</strong> <span>{navigator.userAgent}</span></div>
        <div><strong>ウォレット検出:</strong> <span>@mysten/dapp-kitを使用</span></div>
      </div>
    </footer>
  );
};

export default Footer; 