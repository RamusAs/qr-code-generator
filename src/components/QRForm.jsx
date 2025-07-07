import React from 'react';

const QRForm = ({ qrType, setQrType, qrData, setQrData }) => {
  const handleTypeChange = (e) => {
    setQrType(e.target.value);
    setQrData({}); // reset data on type change
  };

  const handleInputChange = (e) => {
    setQrData({ ...qrData, [e.target.name]: e.target.value });
  };

  return (
    <div className="qr-form">
      <h2>Type de QR Code</h2>
      <select value={qrType} onChange={handleTypeChange}>
        <option value="url">URL</option>
        <option value="text">Texte libre</option>
        <option value="wifi">WiFi</option>
        <option value="facebook">Facebook</option>
        <option value="instagram">Instagram</option>
        <option value="twitter">Twitter</option>
        <option value="linkedin">LinkedIn</option>
        <option value="vcard">vCard (Contact)</option>
      </select>
      {qrType === 'url' && (
        <div>
          <label>URL :</label>
          <input
            type="text"
            name="url"
            value={qrData.url || ''}
            onChange={handleInputChange}
            placeholder="https://exemple.com"
          />
        </div>
      )}
      {qrType === 'text' && (
        <div>
          <label>Texte :</label>
          <input
            type="text"
            name="text"
            value={qrData.text || ''}
            onChange={handleInputChange}
            placeholder="Votre texte ici"
          />
        </div>
      )}
      {qrType === 'wifi' && (
        <div>
          <label>Nom du réseau (SSID) :</label>
          <input
            type="text"
            name="ssid"
            value={qrData.ssid || ''}
            onChange={handleInputChange}
            placeholder="Nom du réseau WiFi"
          />
          <label>Mot de passe :</label>
          <input
            type="text"
            name="password"
            value={qrData.password || ''}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
          <label>Sécurité :</label>
          <select name="encryption" value={qrData.encryption || 'WPA'} onChange={handleInputChange}>
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">Aucune</option>
          </select>
        </div>
      )}
      {['facebook','instagram','twitter','linkedin'].includes(qrType) && (
        <div>
          <label>Lien {qrType.charAt(0).toUpperCase() + qrType.slice(1)} :</label>
          <input
            type="text"
            name="social"
            value={qrData.social || ''}
            onChange={handleInputChange}
            placeholder={`https://www.${qrType}.com/votreprofil`}
          />
        </div>
      )}
      {qrType === 'vcard' && (
        <div>
          <label>Prénom :</label>
          <input type="text" name="firstName" value={qrData.firstName || ''} onChange={handleInputChange} />
          <label>Nom :</label>
          <input type="text" name="lastName" value={qrData.lastName || ''} onChange={handleInputChange} />
          <label>Téléphone :</label>
          <input type="text" name="phone" value={qrData.phone || ''} onChange={handleInputChange} />
          <label>Email :</label>
          <input type="email" name="email" value={qrData.email || ''} onChange={handleInputChange} />
          <label>Organisation :</label>
          <input type="text" name="org" value={qrData.org || ''} onChange={handleInputChange} />
        </div>
      )}
    </div>
  );
};

export default QRForm; 