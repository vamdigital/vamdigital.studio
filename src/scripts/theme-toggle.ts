type ToggleParams = "light" | "dark" | "system";

const themeIcons: Record<string, string> = {
  light: "☀️",
  dark: "🌙",
  system: "🌗",
};

function setAttributeValue(value: ToggleParams) {
  const documentRoot = document.documentElement;
  if (value === "system") {
    documentRoot.removeAttribute("data-theme");
  } else {
    documentRoot.setAttribute("data-theme", value);
  }
}

function getStoredTheme(): ToggleParams {
  const stored = localStorage.getItem("theme") as ToggleParams;
  return stored && ["light", "dark", "system"].includes(stored)
    ? stored
    : "system";
}

function setStoredTheme(value: ToggleParams) {
  localStorage.setItem("theme", value);
}

// Stable reference at module scope so removeEventListener can find it
function handleSelectChange(event: Event) {
  if (!(event.target instanceof HTMLSelectElement)) return;
  const value = event.target.value as ToggleParams;
  setAttributeValue(value);
  setStoredTheme(value);
  const iconElement = document.getElementById("theme-icon");
  if (iconElement) iconElement.textContent = themeIcons[value];
}

function applyTheme() {
  const theme = getStoredTheme();
  setAttributeValue(theme);

  const selectElement = document.querySelector<HTMLSelectElement>(
    "#theme-selector",
  );
  const iconElement = document.querySelector<HTMLSpanElement>(
    "#theme-icon",
  );

  if (selectElement) {
    selectElement.value = theme;
    // Remove before adding to prevent duplicate listeners on each navigation
    selectElement.removeEventListener("change", handleSelectChange);
    selectElement.addEventListener("change", handleSelectChange);
  }

  if (iconElement) iconElement.textContent = themeIcons[theme];
}

// Re-runs applyTheme (and re-attaches the listener) on every ClientRouter navigation
document.addEventListener("astro:page-load", applyTheme);

// Also run immediately for the very first page load
applyTheme();
