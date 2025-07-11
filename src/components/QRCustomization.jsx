import React from 'react';
import { SketchPicker } from 'react-color';
import QRPreview from './QRPreview'

const shapeOptions = [
  { value: "square", label: "Carré" },
  { value: "dots", label: "Points" },
  { value: "extra-rounded", label: "Arrondi" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Classy arrondi" },
]
const eyeOptions = [
  { value: "square", label: "Carré" },
  { value: "dot", label: "Rond" },
  { value: "extra-rounded", label: "Très arrondi" },
]

export const QRCustomization = ({
  customization,
  setCustomization,
  qrType,
  qrData,
  qrInstance,
}) => {
  const handleColorChange = (color, type) => {
    setCustomization({ ...customization, [type]: color.hex })
  }

  const handleChange = (e) => {
    setCustomization({ ...customization, [e.target.name]: e.target.value })
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setCustomization({ ...customization, logo: ev.target.result })
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="qr-customization" style={{ margin: "20px 0" }}>
      <h2>Personnalisation</h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ minWidth: 200 }}>
          <label>Couleur du QR :</label>
          <SketchPicker
            color={customization.fgColor}
            onChange={(color) => handleColorChange(color, "fgColor")}
          />
        </div>
        <div style={{ minWidth: 200 }}>
          <label>Couleur de fond :</label>
          <SketchPicker
            color={customization.bgColor}
            onChange={(color) => handleColorChange(color, "bgColor")}
          />
        </div>
        <div>
          <div>
            <label>Taille (px) :</label>
            <input
              type="number"
              name="size"
              min={128}
              max={512}
              value={customization.size}
              onChange={handleChange}
              style={{ width: 80 }}
            />
          </div>
          <div>
            <label>Forme des modules :</label>
            <select
              name="shape"
              value={customization.shape || "square"}
              onChange={handleChange}
              style={{ width: 100 }}
            >
              {shapeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Forme des yeux :</label>
            <select
              name="eyeShape"
              value={customization.eyeShape || "square"}
              onChange={handleChange}
              style={{ width: 100 }}
            >
              {eyeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Logo au centre :</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} />
            {customization.logo && (
              <div style={{ marginTop: 8 }}>
                <img
                  src={customization.logo}
                  alt="Logo"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "contain",
                    borderRadius: 8,
                    border: "1px solid #ccc",
                  }}
                />
                <button
                  onClick={() =>
                    setCustomization({ ...customization, logo: null })
                  }
                  style={{ marginLeft: 8 }}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        </div>
        <QRPreview
          qrType={qrType}
          qrData={qrData}
          customization={customization}
          qrInstance={qrInstance}
        />
      </div>
    </div>
  )
}

export default QRCustomization
