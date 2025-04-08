/**
 * ThemeProvider
 *
 * Handles application theming (light, dark, system) using localStorage and
 * system preference detection via `window.matchMedia`.
 * 
 * When in 'system' mode, automatically syncs with OS-level theme preferences.
 *
 * Automatically applies themes by updating the `data-theme` attribute on the <html> element.
 *
 * Usage:
 *   const themeProvider = new ThemeProvider();
 *   themeProvider.setTheme('dark'); // or 'light' or 'system'/'sys' 
 *   themeProvider.getTheme(); // returns the current stored theme ('light', 'dark', or 'system')
 */
export class ThemeProvider {
  constructor() {
    // Prevent errors during server-side rendering
    if (typeof window === "undefined" || typeof document === "undefined")
      return;

    /**
     * Media query to detect if system prefers dark mode
     * @type {MediaQueryList}
     */
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    /**
     * Tracks whether the system listener is already attached
     * @type {boolean}
     */
    this.listenerAttached = false;

    // Bind the system theme change handler to ensure correct `this` context
    this.handleSystemChange = this.handleSystemChange.bind(this);

    /**
     * The currently selected theme
     * Possible values: 'light', 'dark', 'system'
     * @type {string}
     */
    this.theme = this.normalizeTheme(localStorage.getItem("theme") || "system");

    // Initialize theme handling
    this.init();
  }

  /**
   * Converts aliases like 'sys' to the canonical 'system'
   * @param {string} theme - The theme value to normalize
   * @returns {string} The normalized theme value
   */
  normalizeTheme(theme) {
    return theme === "sys" ? "system" : theme;
  }

  /**
   * Applies the effective theme to the document
   * Always sets 'light' or 'dark' to <html data-theme="">
   * @param {'light'|'dark'} theme - The theme to apply
   */
  applyTheme(theme) {
    const effectiveTheme = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", effectiveTheme);

    /**
     * Stores the currently applied effective theme (light/dark only)
     * @type {string}
     */
    this.effectiveTheme = effectiveTheme;
  }

  /**
   * Reacts to changes in system color preference
   * Only runs when theme mode is 'system'
   * @param {MediaQueryListEvent} event - The media query change event
   */
  handleSystemChange(event) {
    if (this.theme === "system") {
      this.applyTheme(event.matches ? "dark" : "light");
    }
  }

  /**
   * Adds a listener to respond to system theme changes
   * Only attaches if not already listening
   */
  addSystemListener() {
    if (!this.listenerAttached) {
      this.mediaQuery.addEventListener("change", this.handleSystemChange);
      this.listenerAttached = true;
    }
  }

  /**
   * Removes the system theme change listener if attached
   * Cleans up event listeners when no longer needed
   */
  removeSystemListener() {
    if (this.listenerAttached) {
      this.mediaQuery.removeEventListener("change", this.handleSystemChange);
      this.listenerAttached = false;
    }
  }

  /**
   * Initializes the theme on page load
   * Applies the stored theme and sets up listeners if needed
   * @private
   */
  init() {
    this.setTheme(this.theme);
  }

  /**
   * Gets the current theme setting
   * @returns {string} The current theme ('light', 'dark', or 'system')
   */
  getTheme() {
    return this.theme;
  }

  /**
   * Sets and applies a new theme
   * Also updates localStorage and manages system listeners
   *
   * @param {'light'|'dark'|'system'|'sys'} newTheme - The new theme mode to apply
   * @throws {Error} If an invalid theme value is provided
   */
  setTheme(newTheme) {
    newTheme = this.normalizeTheme(newTheme);

    const validThemes = ["light", "dark", "system"];
    if (!validThemes.includes(newTheme)) {
      throw new Error(
        'Invalid theme. Valid values are: "light", "dark", "system".'
      );
    }

    // Clean up previous listener if we're changing from 'system' to a fixed theme
    this.removeSystemListener();

    this.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    if (newTheme === "system") {
      // Apply current system theme and start listening for changes
      this.applyTheme(this.mediaQuery.matches ? "dark" : "light");
      this.addSystemListener();
    } else {
      // Apply chosen static theme
      this.applyTheme(newTheme);
    }
  }
}
