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

function toggleTheme() {
  let selectElement = document.querySelector('#theme-selector') as HTMLSelectElement
  let iconElement = document.querySelector('#theme-icon') as HTMLSpanElement
  selectElement?.addEventListener("change", handleSelectChange)
  iconElement.textContent = themeIcons["system"]

  function handleSelectChange(event: Event) {
    if (!(event.target instanceof HTMLSelectElement)) return; // safe guard
    const target = event.target
    const value = target.value as ToggleParams
    setAttributeValue(value)
    iconElement.textContent = themeIcons[value]
    themeIcons[value]
  }
}

toggleTheme()