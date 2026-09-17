type ToggleParams = "light" | "dark" | "system";

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

function handleThemeClick(event: Event) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLButtonElement)) return;

  const value = target.dataset.themeValue as ToggleParams | undefined;
  if (!value || !["light", "dark", "system"].includes(value)) return;

  setAttributeValue(value);
  setStoredTheme(value);
  updateSelectedOption(value);
}

function updateSelectedOption(theme: ToggleParams) {
  document.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach(
    (button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.themeValue === theme),
      );
    },
  );
}

function applyTheme() {
  const theme = getStoredTheme();
  setAttributeValue(theme);

  document.querySelectorAll<HTMLButtonElement>("[data-theme-value]").forEach(
    (button) => {
      // Prevent duplicate listeners after ClientRouter navigation.
      button.removeEventListener("click", handleThemeClick);
      button.addEventListener("click", handleThemeClick);
    },
  );
  updateSelectedOption(theme);
}

// Re-runs applyTheme (and re-attaches the listener) on every ClientRouter navigation
document.addEventListener("astro:page-load", applyTheme);

// Also run immediately for the very first page load
applyTheme();
