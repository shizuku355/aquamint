import React, { useState } from 'react';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import NFTDetails from './components/NFTDetails';
import NFTPreview from './components/NFTPreview';
import Footer from './components/Footer';

// 翻訳データは元のコードから取得
const translations = {
  ja: {
    title: "AQUAMINT",
    tagline: "大切な思い出をNFTとして永遠に残しましょう",
    uploadTitle: "写真をアップロード",
    dropText: "写真をドラッグ＆ドロップ<br>または<br>クリックして選択",
    fileTypes: "JPG、PNG、GIF形式、最大5MBまで",
    detailsTitle: "NFT情報を入力",
    nameLabel: "NFT名",
    namePlaceholder: "例：夏の思い出2023",
    descLabel: "説明",
    descPlaceholder: "この写真の思い出や説明を書いてください",
    tagsLabel: "タグ（カンマ区切り）",
    tagsPlaceholder: "例：夏休み,家族,海",
    previewTitle: "NFTプレビュー",
    previewDefault: "説明文がここに表示されます",
    generateBtn: "NFTを生成する",
    connectBtn: "ウォレット接続",
    footer: "© 2025 AQUAMINT | Powered by Walrus & Sui",
    errorSize: "ファイルサイズは5MB以下にしてください",
    errorNoImage: "画像をアップロードしてください",
    errorNoName: "NFT名を入力してください",
    errorNoDesc: "説明文を入力してください",
    successMsg: "NFTの生成準備ができました！\n\n今後のバージョンアップで実際にNFTが生成できるようになります。お楽しみに！",
    walletMsg: "ウォレット接続機能は今後実装予定です。お楽しみに！",
    walletConnect: "ウォレットに接続",
    noWallets: "ウォレットが見つかりません。インストールしてください。",
    installWallet: "Sui対応ウォレットをインストール",
    loadingWallets: "ウォレットを読み込み中...",
    connectedStatus: "接続済み",
    connectedWith: "接続中のウォレット:",
    disconnect: "切断する",
    copied: "コピーしました！",
    minting: "Minting",
    mintAnother: "Mint Another",
    mintSuccess: "Minting successful!",
    mintError: "Minting Error",
    needWalletInstall: "Please install a wallet to proceed with minting."
  },
  en: {
    title: "AQUAMINT",
    tagline: "Preserve your precious memories as NFTs forever",
    uploadTitle: "Upload Photo",
    dropText: "Drag & Drop Photo<br>or<br>Click to Select",
    fileTypes: "JPG, PNG, GIF formats, up to 5MB",
    detailsTitle: "Enter NFT Information",
    nameLabel: "NFT Name",
    namePlaceholder: "Example: Summer Memories 2023",
    descLabel: "Description",
    descPlaceholder: "Write memories or description about this photo",
    tagsLabel: "Tags (comma separated)",
    tagsPlaceholder: "Example: summer,family,beach",
    previewTitle: "NFT Preview",
    previewDefault: "Description will appear here",
    generateBtn: "Generate NFT",
    connectBtn: "Connect Wallet",
    footer: "© 2025 AQUAMINT | Powered by Walrus & Sui",
    errorSize: "File size should be less than 5MB",
    errorNoImage: "Please upload an image",
    errorNoName: "Please enter NFT name",
    errorNoDesc: "Please enter description",
    successMsg: "Your NFT is ready to be generated!\n\nActual NFT generation will be available in future updates. Stay tuned!",
    walletMsg: "Wallet connection feature coming soon. Stay tuned!",
    walletConnect: "Connect Wallet",
    noWallets: "No wallets found. Please install one.",
    installWallet: "Install Sui Wallet",
    loadingWallets: "Loading wallets...",
    connectedStatus: "Connected",
    connectedWith: "Connected with:",
    disconnect: "Disconnect",
    copied: "Copied!",
    minting: "Minting",
    mintAnother: "Mint Another",
    mintSuccess: "Minting successful!",
    mintError: "Minting Error",
    needWalletInstall: "Please install a wallet to proceed with minting."
  }
};

function App() {
  // 状態管理
  const [currentLang, setCurrentLang] = useState('ja');
  const [previewImage, setPreviewImage] = useState(null);
  const [nftData, setNftData] = useState({
    name: '',
    description: '',
    tags: ''
  });
  
  // 言語の切り替え
  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
  };
  
  // NFT生成処理
  const handleGenerateNFT = () => {
    const t = translations[currentLang];
    
    // 入力チェック
    if (!previewImage) {
      alert(t.errorNoImage);
      return;
    }
    
    if (!nftData.name) {
      alert(t.errorNoName);
      return;
    }
    
    if (!nftData.description) {
      alert(t.errorNoDesc);
      return;
    }
    
    // ウォレット接続機能はまだ実装予定
    alert(t.walletMsg);
    
    // 実際のNFT生成ロジックはここに実装（将来的にSui SDKを使用）
    alert(t.successMsg);
  };

  return (
    <div className="container">
      <Header 
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        translations={translations}
      />

      <main>
        <UploadSection 
          currentLang={currentLang}
          translations={translations}
          onImageUpload={setPreviewImage}
        />

        <NFTDetails 
          currentLang={currentLang}
          translations={translations}
          nftData={nftData}
          setNftData={setNftData}
        />

        <NFTPreview 
          currentLang={currentLang}
          translations={translations}
          nftData={nftData}
          previewImage={previewImage}
        />

        <section className="action-buttons">
          <button 
            className="btn primary-btn" 
            onClick={handleGenerateNFT}
          >
            {translations[currentLang].generateBtn}
          </button>
        </section>
      </main>

      <Footer 
        currentLang={currentLang}
        translations={translations}
      />
    </div>
  );
}

export default App; 