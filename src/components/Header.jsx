import React from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import LanguageToggle from './LanguageToggle';

const Header = ({ currentLang, onLanguageChange, translations }) => {
  const t = translations[currentLang];

  return (
    <header>
      <div className="header-content">
        <LanguageToggle 
          currentLang={currentLang} 
          onLanguageChange={onLanguageChange} 
        />
        <ConnectButton />
      </div>
      <h1 className="logo">AQUAMINT</h1>
      <p className="tagline">{t.tagline}</p>
    </header>
  );
};

export default Header; 