# 🌗 ThemeProvider

A **lightweight zero-dependency JavaScript utility** to manage light, dark, and system themes for your web application.

It automatically:

- Detects system theme preference (`prefers-color-scheme`)
- Persists the user’s theme setting using `localStorage`
- Applies the theme using `data-theme` attribute on `<html>`
- Syncs in real-time with OS-level changes when `system` is active

## 🚀 Quick Start

You can use it directly via **CDN** (from GitHub Pages):

```html
<script src="https://shaileshpandit141.github.io/theme-provider/dist/themeProvider.min.js"></script>
```

This exposes a global `themeProvider` object on the `window`.

## 🌐 Live Demo

👉 [View the demo](https://shaileshpandit141.github.io/theme-provider/demo/)

## 📦 Installation (optional for developers)

If you want to use it via source (e.g., in a bundler setup):

```bash
git clone https://github.com/shaileshpandit141/theme-provider.git
cd theme-provider
npm install
npm run build
```

The bundled file will be in `dist/themeProvider.min.js`.

## 💡 How It Works

The script:

- Adds a `data-theme="light"` or `data-theme="dark"` attribute to `<html>`
- Stores the user’s selected mode in `localStorage`
- Defaults to `system` if no previous choice was saved
- Reacts to OS-level changes when in `system` mode using `matchMedia`

## 🧩 API Reference

After loading the script, access the global API via:

```js
window.themeProvider
```

### 🔹 `themeProvider.setTheme(theme)`

Set the current theme.

| Theme      | Description                    |
| ---------- | ------------------------------ |
| `'light'`  | Light mode                     |
| `'dark'`   | Dark mode                      |
| `'system'` | Sync with OS-level preferences |
| `'sys'`    | Alias for `'system'`           |

```js
themeProvider.setTheme('dark');
themeProvider.setTheme('light');
themeProvider.setTheme('system');
```

> Automatically saves to `localStorage` and updates the DOM.

### 🔹 `themeProvider.getTheme()`

Get the currently selected theme.

```js
const theme = themeProvider.getTheme(); // 'light' | 'dark' | 'system'
```

## ✅ Example Usage

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Theme Provider Demo</title>
    <!-- Linked themeProvider script file. -->
    <script src="https://shaileshpandit141.github.io/theme-provider/dist/themeProvider.min.js"></script>
    
    <!-- Define inline css styles -->
    <style>
      :root {
        --bg-primary: #fff;
        --color-primary: #181818;
      }

      :root[data-theme="dark"] {
        --bg-primary: #181818;
        --color-primary: #fff;
      }

      body {
        background-color: var(--bg-primary);
        color: var(--color-primary);
        transition: background-color 0.4s ease-in-out, color 0.4s ease-in-out;
      }
    </style>
  </head>
  <body>
    <!-- Theme Selector Element-->
    <select
      onchange="themeProvider.setTheme(this.value)"
      class="theme-selector"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    <script>
      // Update the theme selector value based on the current theme. When the page loads.
      const themeSelector = document.querySelector(".theme-selector");
      themeSelector.value = themeProvider.getTheme();
    </script>
  </body>
</html>
```

## ⚙️ Internals

### `ThemeProvider` class

Internally, the utility instantiates a singleton of this class.

Key features:

- Uses `window.matchMedia('(prefers-color-scheme: dark)')`
- Automatically handles system changes via `addEventListener('change')`
- `localStorage.getItem('theme')` for persistence
- Sets `data-theme` on the `<html>` element

## 🧪 Browser Support

✅ Modern browsers:

- Chrome
- Firefox
- Safari
- Edge
- Opera

> It uses `matchMedia`, `localStorage`, and ES6+ features.

## 🧱 Project Structure

```text
theme-provider/
├── dist/
│   └── themeProvider.min.js         # Production CDN bundle (via Rollup)
├── demo/
│   └── index.html                   # Live demo page
├── assets/
│   └── icons/                       
│     └── favicon.png                # favicon
├── styles/
│   └── style.html                   # style
├── src/
│   ├── index.js                     # Public API (getTheme, setTheme)
│   └── theme-provider.js            # ThemeProvider class
├── .gitignore                       # gitignore config
├── index.html                       # Project landing page
├── LICENSE                          # MIT LICENSE config
├── package.jsson                    # package.json config
├── README.md                        # This doc
└── rollup.config.js                 # Bundler config
```

## 📦 Rollup Build (For Devs)

Your `rollup.config.js`:

```js
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/themeProvider.min.js",
    format: "iife",                     // for global usage in browser
    name: "themeProvider",              // window.MyUtils
  },
  plugins: [terser()],
};
```

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

If you have any questions or need assistance with this project, please contact Shailesh at `shaileshpandit141@gmail.com`.

Thank you
