import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';

const getQrValue = (qrType, qrData) => {
  if (qrType === 'url') return qrData.url || '';
  if (qrType === 'text') return qrData.text || '';
  if (qrType === 'wifi') {
    // Format WiFi QR: WIFI:T:WPA;S:SSID;P:password;;
    const enc = qrData.encryption || 'WPA';
    const ssid = qrData.ssid || '';
    const pwd = qrData.password || '';
    return `WIFI:T:${enc};S:${ssid};P:${pwd};;`;
  }
  if (['facebook','instagram','twitter','linkedin'].includes(qrType)) {
    return qrData.social || '';
  }
  if (qrType === 'vcard') {
    // Format vCard simple
    const fn = qrData.firstName || '';
    const ln = qrData.lastName || '';
    const phone = qrData.phone || '';
    const email = qrData.email || '';
    const org = qrData.org || '';
    return `BEGIN:VCARD\nVERSION:3.0\nN:${ln};${fn};;;\nFN:${fn} ${ln}\nORG:${org}\nTEL:${phone}\nEMAIL:${email}\nEND:VCARD`;
  }
  return '';
};

const QRPreview = ({ qrType, qrData, customization, qrInstance }) => {
  const qrRef = useRef();
  const localInstance = useRef();
  const value = getQrValue(qrType, qrData);

  useEffect(() => {
    if (!localInstance.current) {
      localInstance.current = new QRCodeStyling({
        width: customization.size,
        height: customization.size,
        data: value,
        image: customization.logo || undefined,
        dotsOptions: {
          color: customization.fgColor,
          type: customization.shape || 'square',
        },
        backgroundOptions: {
          color: customization.bgColor,
        },
        cornersSquareOptions: {
          type: customization.eyeShape || 'square',
          color: customization.fgColor,
        },
        cornersDotOptions: {
          color: customization.fgColor,
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 4,
        },
      });
    } else {
      localInstance.current.update({
        width: customization.size,
        height: customization.size,
        data: value,
        image: customization.logo || undefined,
        dotsOptions: {
          color: customization.fgColor,
          type: customization.shape || 'square',
        },
        backgroundOptions: {
          color: customization.bgColor,
        },
        cornersSquareOptions: {
          type: customization.eyeShape || 'square',
          color: customization.fgColor,
        },
        cornersDotOptions: {
          color: customization.fgColor,
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 4,
        },
      });
    }
    if (qrRef.current) {
      qrRef.current.innerHTML = '';
      localInstance.current.append(qrRef.current);
    }
    if (qrInstance) {
      qrInstance.current = localInstance.current;
    }
  }, [value, customization, qrInstance]);

  return (
    <div className="qr-preview">
      <h2>Aperçu du QR Code</h2>
      <div
        ref={qrRef}
        style={{
          background: customization.bgColor,
          padding: customization.margin,
          display: 'inline-block',
          borderRadius: 16,
          minHeight: customization.size,
          minWidth: customization.size,
        }}
      />
      {!value && <p>Veuillez saisir des données pour générer un QR code.</p>}
    </div>
  );
};

export default QRPreview; 