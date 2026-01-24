type ToggleParams = 'light' | 'dark' | 'system'

const themeIcons: Record<string, string> = {
  light: '☀️',
  dark: '🌙',
  system: '🌗'
}

function setAttributeValue(value: ToggleParams) {
  let documentRoot = document.documentElement
  // setAttribute
  if(value === 'system') {
    documentRoot.removeAttribute('data-theme')
  } else {
    documentRoot.setAttribute('data-theme', value)
  }
}

function getStoredTheme(): ToggleParams {
  const stored = localStorage.getItem('theme') as ToggleParams
  return stored && ['light', 'dark', 'system'].includes(stored) ? stored : 'system'
}

function setStoredTheme(value: ToggleParams) {
  localStorage.setItem('theme', value)
}

function applyTheme() {
  const theme = getStoredTheme()
  setAttributeValue(theme)
  const selectElement = document.querySelector('#theme-selector') as HTMLSelectElement
  const iconElement = document.querySelector('#theme-icon') as HTMLSpanElement
  if (selectElement) selectElement.value = theme
  if (iconElement) iconElement.textContent = themeIcons[theme]
}

function toggleTheme() {
  // Apply theme on page load (including initial and navigation)
  document.addEventListener('astro:page-load', applyTheme)

  // Also apply immediately in case the event has already fired
  applyTheme()

  const selectElement = document.querySelector('#theme-selector') as HTMLSelectElement
  const iconElement = document.querySelector('#theme-icon') as HTMLSpanElement

  selectElement?.addEventListener("change", handleSelectChange)

  function handleSelectChange(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return; // safe guard
    const target = event.target
    const value = target.value as ToggleParams
    setAttributeValue(value)
    setStoredTheme(value)
    if (iconElement) iconElement.textContent = themeIcons[value]
  }
}

toggleTheme()