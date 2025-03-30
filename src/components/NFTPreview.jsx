import React from 'react';

const NFTPreview = ({ currentLang, translations, nftData, previewImage }) => {
  const t = translations[currentLang];

  return (
    <section className="nft-preview">
      <h2>{t.previewTitle}</h2>
      <div className="preview-container">
        <div className="preview-card" id="preview-card">
          <div className="preview-image-container">
            <img 
              src={previewImage || "/images/placeholder.png"} 
              alt="NFT Preview" 
              style={{
                width: '100%',
                height: '100%',
                objectFit: previewImage ? 'cover' : 'contain'
              }}
            />
          </div>
          <div className="preview-info">
            <h3>{nftData.name || (currentLang === 'ja' ? 'NFT名' : 'NFT Name')}</h3>
            <p>{nftData.description || t.previewDefault}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NFTPreview; 