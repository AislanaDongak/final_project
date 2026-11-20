// ========== palette.js — переключатель палитры ==========

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const paletteButtons = document.querySelectorAll('.palette-btn');

    paletteButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const newPalette = btn.dataset.palette;

        const current = window.TerraSettings.loadSettings();
        current.paletteId = newPalette;
        window.TerraSettings.saveSettings(current);
        window.TerraSettings.applySettings(current);

        console.log('[Палитра] Переключено на:', newPalette, '→ сохранено в localStorage');
      });
    });
  });
})();
