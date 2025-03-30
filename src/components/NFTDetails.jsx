import React from 'react';

const NFTDetails = ({ 
  currentLang, 
  translations, 
  nftData, 
  setNftData 
}) => {
  const t = translations[currentLang];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNftData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="nft-details">
      <h2>{t.detailsTitle}</h2>
      <form id="nft-form">
        <div className="form-group">
          <label htmlFor="name">{t.nameLabel}</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={nftData.name}
            onChange={handleChange}
            placeholder={t.namePlaceholder} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">{t.descLabel}</label>
          <textarea 
            id="description" 
            name="description" 
            value={nftData.description}
            onChange={handleChange}
            placeholder={t.descPlaceholder} 
            rows="4" 
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="tags">{t.tagsLabel}</label>
          <input 
            type="text" 
            id="tags" 
            name="tags" 
            value={nftData.tags}
            onChange={handleChange}
            placeholder={t.tagsPlaceholder} 
            required 
          />
        </div>
      </form>
    </section>
  );
};

export default NFTDetails; 