import { useState, useRef, useEffect } from "react"
import { SketchPicker } from "react-color"
import { QRPreview } from "./QRPreview"

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
  // Pour gérer l'ouverture des pickers
  const [showFgPicker, setShowFgPicker] = useState(false)
  const [showBgPicker, setShowBgPicker] = useState(false)
  const fgRef = useRef()
  const bgRef = useRef()

  // Fermer le picker si clic en dehors
  useEffect(() => {
    const handleClick = (e) => {
      if (showFgPicker && fgRef.current && !fgRef.current.contains(e.target)) {
        setShowFgPicker(false)
      }
      if (showBgPicker && bgRef.current && !bgRef.current.contains(e.target)) {
        setShowBgPicker(false)
      }
    }
    if (showFgPicker || showBgPicker) {
      document.addEventListener("mousedown", handleClick)
    }
    return () => document.removeEventListener("mousedown", handleClick)
  }, [showFgPicker, showBgPicker])

  // Conversion RGBA -> CSS string
  const rgbaToHex = ({ r, g, b, a }) =>
    `#${[r, g, b, Math.round(a * 255)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")}`

  return (
    <div className="qr-customization">
      <h2>Personnalisation</h2>
      <div className="qr-customization__container">
        <div>
          <div>
            <label>Taille (px) :</label>
            <input
              type="number"
              name="size"
              min={128}
              max={512}
              value={customization.size}
              onChange={(e) =>
                setCustomization({ ...customization, size: e.target.value })
              }
              style={{ width: 80 }}
            />
          </div>
          <div>
            <label>Forme des modules :</label>
            <select
              name="shape"
              value={customization.shape || "square"}
              onChange={(e) =>
                setCustomization({ ...customization, shape: e.target.value })
              }
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
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  eyeShape: e.target.value,
                })
              }
              style={{ width: 100 }}
            >
              {eyeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label>Couleur du QR :</label>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 40,
                height: 32,
                borderRadius: 6,
                border: "1.5px solid #cfd8dc",
                background: customization.fgColor,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(80,80,180,0.08)",
                display: "inline-block",
              }}
              onClick={() => setShowFgPicker((v) => !v)}
              title="Choisir la couleur du QR"
            />
            {showFgPicker && (
              <div
                ref={fgRef}
                style={{ position: "absolute", zIndex: 10, top: 40, left: 0 }}
              >
                <SketchPicker
                  color={customization.fgColor}
                  onChange={(color) =>
                    setCustomization({
                      ...customization,
                      fgColor: rgbaToHex(color.rgb),
                    })
                  }
                  eyeDropper={true}
                />
              </div>
            )}
          </div>

          <label>Couleur de fond :</label>
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 40,
                height: 32,
                borderRadius: 6,
                border: "1.5px solid #cfd8dc",
                background: customization.bgColor,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(80,80,180,0.08)",
                display: "inline-block",
              }}
              onClick={() => setShowBgPicker((v) => !v)}
              title="Choisir la couleur de fond"
            />
            {showBgPicker && (
              <div
                ref={bgRef}
                style={{ position: "absolute", zIndex: 10, top: 40, left: 0 }}
              >
                <SketchPicker
                  color={customization.bgColor}
                  onChange={(color) =>
                    setCustomization({
                      ...customization,
                      bgColor: rgbaToHex(color.rgb),
                    })
                  }
                  eyeDropper={true}
                />
              </div>
            )}
          </div>
          <div>
            <label>Logo au centre :</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (ev) => {
                  setCustomization({ ...customization, logo: ev.target.result })
                }
                reader.readAsDataURL(file)
              }}
            />
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
