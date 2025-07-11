// vite.config.js
export default {
  build: {
    outDir: "dist", // Vérifie que le dossier de sortie est bien 'dist'
    rollupOptions: {
      input: "/src/main.jsx", // Vérifie que l'entrée principale du projet est correcte
    },
  },
}
