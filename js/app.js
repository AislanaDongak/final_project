// ========== app.js — точка входа ==========

document.addEventListener('DOMContentLoaded', () => {
  const Settings = window.TerraSettings;

  const settings = Settings.loadSettings();
  Settings.applySettings(settings);

  const form = document.getElementById('settings-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newSettings = Settings.collectFormSettings();
      Settings.saveSettings(newSettings);
      Settings.applySettings(newSettings);
      console.log('[Настройки] Сохранено:', newSettings);
    });
  }

  const resetBtn = document.getElementById('reset-settings');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('terra_botgarden_settings');
      Settings.applySettings(Settings.DEFAULTS);
      Settings.saveSettings(Settings.DEFAULTS);
      console.log('[Настройки] Сброшено к значениям по умолчанию');
    });
  }
});
