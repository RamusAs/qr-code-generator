import { useState, useRef } from "react"
import { QRCustomization, QRDownload, QRForm } from "./components"
import "./App.css"
import logoQR from "../public/assets/logoQR.png"

function App() {
  const [qrType, setQrType] = useState("url")
  const [qrData, setQrData] = useState({ url: "ramuas.com" })
  const [customization, setCustomization] = useState({
    fgColor: "#000000",
    bgColor: "#ffffff",
    shape: "square",
    eyeShape: "square",
    logo: null,
    margin: 4,
    size: 256,
  })
  const qrInstance = useRef(null)

  return (
    <div className="app-container">
      <div className="header">
        <img src={logoQR} alt="Logo QR Code" className="header-logo" />
        <h1 className="header-title">Générateur de QR Code</h1>
      </div>
      <QRForm
        qrType={qrType}
        setQrType={setQrType}
        qrData={qrData}
        setQrData={setQrData}
      />
      <QRCustomization
        customization={customization}
        setCustomization={setCustomization}
        qrType={qrType}
        qrData={qrData}
        qrInstance={qrInstance}
      />

      <QRDownload
        qrType={qrType}
        qrData={qrData}
        customization={customization}
        qrInstance={qrInstance}
      />
    </div>
  )
}

export default App
