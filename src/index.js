/**
 * Singleton theme provider instance and utilities for managing application theming
 * This module provides a single global theme provider instance and wrappers for
 * getting/setting theme values. The theme provider handles system preference
 * detection, local storage persistence, and automatic application of themes.
 *
 * Usage:
 *   import { getTheme, setTheme } from './theme-provider.js';
 *
 *   // Get current theme ('light', 'dark', or 'system')
 *   const currentTheme = getTheme();
 *
 *   // Set new theme
 *   setTheme('dark'); // Switch to dark mode
 *   setTheme('light'); // Switch to light mode
 *   setTheme('system'); // Use system preferences
 */
import { ThemeProvider } from "./theme-provider.js";

/**
 * Global singleton instance of ThemeProvider
 * @type {ThemeProvider}
 */
const themeProvider = new ThemeProvider();

/**
 * Gets the current theme setting
 * @returns {string} Current theme value ('light', 'dark', or 'system')
 */
const getTheme = () => themeProvider.getTheme();

/**
 * Sets and applies a new theme
 * @param {'light'|'dark'|'system'|'sys'} theme - The new theme to apply
 * @throws {Error} If an invalid theme value is provided
 */
const setTheme = (theme) => themeProvider.setTheme(theme);

export { getTheme, setTheme };
