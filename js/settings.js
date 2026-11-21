// ========== settings.js — модуль настроек (localStorage) ==========

const STORAGE_KEY = 'terra_botgarden_settings';

const DEFAULTS = {
  name: 'Терра',
  slogan: 'Земля. Забота. Тепло.',
  paletteId: 'warm',
  fontId: 'terrra-sans',
  fontSetting: 'дружелюбный · 1.5 interlineage',
  compositionId: 'comp-01'
};

function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('Не удалось загрузить настройки:', e);
  }
  return { ...DEFAULTS };
}

function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('Не удалось сохранить настройки:', e);
  }
}

function applySettings(settings) {
  document.body.dataset.palette = settings.paletteId;

  const nameEl = document.getElementById('display-name');
  const sloganEl = document.getElementById('display-slogan');
  if (nameEl) nameEl.textContent = settings.name;
  if (sloganEl) sloganEl.textContent = settings.slogan;

  const previewName = document.getElementById('preview-name');
  const previewSlogan = document.getElementById('preview-slogan');
  if (previewName) previewName.textContent = settings.name;
  if (previewSlogan) previewSlogan.textContent = settings.slogan;

  const fontEl = document.getElementById('display-font');
  const fontSettingEl = document.getElementById('display-font-setting');
  if (fontEl) fontEl.textContent = settings.fontId;
  if (fontSettingEl) fontSettingEl.textContent = settings.fontSetting;

  const compEl = document.getElementById('display-composition');
  if (compEl) compEl.textContent = settings.compositionId;

  // Современные шрифты + рукописный акцент для заголовков
  const fontMap = {
    'terrra-sans': {
      body: "'Segoe UI', system-ui, -apple-system, sans-serif",
      display: "'Segoe UI', system-ui, -apple-system, sans-serif"
    },
    'terrra-serif': {
      body: "Georgia, 'Times New Roman', serif",
      display: "'Comic Sans MS', 'Segoe UI', cursive"
    },
    'terrra-mono': {
      body: "'Courier New', Courier, monospace",
      display: "'Segoe UI', system-ui, sans-serif"
    }
  };
  const fonts = fontMap[settings.fontId] || fontMap['terrra-sans'];
  document.documentElement.style.setProperty('--font-family', fonts.body);
  document.documentElement.style.setProperty('--font-display', fonts.display);

  const inputName = document.getElementById('input-name');
  const inputSlogan = document.getElementById('input-slogan');
  const inputPalette = document.getElementById('input-palette');
  const inputFont = document.getElementById('input-font');
  const inputFontSetting = document.getElementById('input-font-setting');
  const inputComposition = document.getElementById('input-composition');

  if (inputName) inputName.value = settings.name;
  if (inputSlogan) inputSlogan.value = settings.slogan;
  if (inputPalette) inputPalette.value = settings.paletteId;
  if (inputFont) inputFont.value = settings.fontId;
  if (inputFontSetting) inputFontSetting.value = settings.fontSetting;
  if (inputComposition) inputComposition.value = settings.compositionId;

  document.querySelectorAll('.palette-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.palette === settings.paletteId);
  });
}

function collectFormSettings() {
  return {
    name: document.getElementById('input-name')?.value.trim() || DEFAULTS.name,
    slogan: document.getElementById('input-slogan')?.value.trim() || DEFAULTS.slogan,
    paletteId: document.getElementById('input-palette')?.value || DEFAULTS.paletteId,
    fontId: document.getElementById('input-font')?.value || DEFAULTS.fontId,
    fontSetting: document.getElementById('input-font-setting')?.value.trim() || DEFAULTS.fontSetting,
    compositionId: document.getElementById('input-composition')?.value.trim() || DEFAULTS.compositionId
  };
}

window.TerraSettings = {
  DEFAULTS,
  loadSettings,
  saveSettings,
  applySettings,
  collectFormSettings
};
