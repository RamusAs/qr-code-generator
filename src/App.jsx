import React, { useState, useRef } from "react"
import QRForm from "./components/QRForm"
import QRCustomization from "./components/QRCustomization"
import QRDownload from "./components/QRDownload"
import "./App.css"

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
      <h1>Générateur de QR Code</h1>
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
        qrInstance={qrInstance.current}
      />

      <QRDownload
        qrType={qrType}
        qrData={qrData}
        customization={customization}
        qrInstance={qrInstance.current}
      />
    </div>
  )
}

export default App
