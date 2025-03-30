import React, { useState, useRef } from 'react';
import { Tusky } from '@tusky-io/ts-sdk';
import { useCurrentAccount, useSignPersonalMessage } from '@mysten/dapp-kit';

const UploadSection = ({ currentLang, translations, onImageUpload }) => {
  const t = translations[currentLang];
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [highlight, setHighlight] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadId, setUploadId] = useState(null);
  
  // Sui Wallet接続
  const account = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  const handleFileChange = async (e) => {
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
      
      // ここでTuskyアップロード処理を追加
      await uploadToTusky(file);
    }
  };
  
  // Tuskyへのアップロード処理
  const uploadToTusky = async (file) => {
    if (!account) {
      alert('ウォレットを接続してください');
      return;
    }
    
    try {
      setUploading(true);
      
      // Tuskyクライアントの初期化（ユーザーのウォレットで認証）
      const tusky = await Tusky.init({ 
        wallet: { signPersonalMessage, account } 
      });
      
      // ユーザーのTuskyアカウントにサインイン
      await tusky.auth.signIn();
      
      // ユーザーのVaultを作成または取得
      let vaultId;
      try {
        // 既存のVaultをリスト
        const vaults = await tusky.vault.list();
        const aquamintVault = vaults.find(v => v.name === 'AQUAMINT NFT Images');
        
        if (aquamintVault) {
          vaultId = aquamintVault.id;
        } else {
          // 新しいVaultを作成
          const { id } = await tusky.vault.create('AQUAMINT NFT Images', {
            encrypted: false // 暗号化なしの公開Vault
          });
          vaultId = id;
        }
      } catch (err) {
        console.error('Vault作成/取得エラー:', err);
        // 新しいVaultを作成
        const { id } = await tusky.vault.create('AQUAMINT NFT Images', {
          encrypted: false
        });
        vaultId = id;
      }
      
      // ファイルアップロード
      const id = await tusky.file.upload(vaultId, file);
      console.log('Tuskyアップロード成功:', id);
      setUploadId(id);
      
      // アップロード成功メッセージ
      alert('画像が正常にアップロードされました！');
    } catch (error) {
      console.error('Tuskyアップロードエラー:', error);
      alert(`アップロードエラー: ${error.message}`);
    } finally {
      setUploading(false);
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
      // ファイルサイズチェック
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
      
      // Tuskyアップロード
      uploadToTusky(file);
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
            <div className="upload-icon">📁</div>
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
      
      {uploading && (
        <div className="upload-status">
          <p>アップロード中...</p>
        </div>
      )}
      
      {uploadId && (
        <div className="upload-status success">
          <p>アップロード完了！ID: {uploadId}</p>
        </div>
      )}
    </section>
  );
};

export default UploadSection;