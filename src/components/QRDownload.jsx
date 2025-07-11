export const QRDownload = ({ qrType, qrData, qrInstance }) => {
  const valueExists = (() => {
    if (qrType === "url") return !!qrData.url
    if (qrType === "text") return !!qrData.text
    if (qrType === "wifi") return !!qrData.ssid
    if (["facebook", "instagram", "twitter", "linkedin"].includes(qrType))
      return !!qrData.social
    if (qrType === "vcard") return !!qrData.firstName || !!qrData.lastName
    return false
  })()

  const downloadSVG = () => {
    if (qrInstance && qrInstance.current && valueExists) {
      qrInstance.current.download({ extension: "svg" })
    }
  }

  const downloadPNG = () => {
    if (qrInstance && qrInstance.current && valueExists) {
      qrInstance.current.download({ extension: "png" })
    }
  }

  return (
    <div className="qr-download" style={{ margin: "20px 0" }}>
      <h2>Téléchargement</h2>
      <button
        onClick={downloadSVG}
        disabled={!valueExists}
        style={{ marginRight: 10 }}
      >
        Télécharger en SVG
      </button>
      <button onClick={downloadPNG} disabled={!valueExists}>
        Télécharger en PNG
      </button>
    </div>
  )
}
