# QRForge

**QRForge** is a privacy-first QR code generator that runs entirely in your browser. No account, backend, or analytics are needed. Your data stays on your device.

## ✨ Features

- **Multiple QR formats:** Generate QR codes for URLs, Wi-Fi networks, and contact details.
- **Live preview:** See changes instantly while typing.
- **Custom styles:** Choose foreground and background colours and error correction levels.
- **Logo support:** Add a PNG, JPG, or SVG logo up to 500 KB.
- **Contrast checker:** Check colour contrast and get warnings for low-contrast combinations.
- **Capacity validation:** Get warnings for large data and errors when QR code limits are exceeded.
- **High-quality downloads:** Export QR codes as PNG or SVG.
- **Saved preferences:** Remember your format, colours, and error correction settings locally.
- **Accessible design:** Includes input labels, error messages, and visible focus indicators.
- **Responsive layout:** Works on mobile and desktop.

## 🛠️ Tech Stack

- React 19
- Vite 6
- Tailwind CSS v4
- qrcode.react v4

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Open the project folder:

   ```bash
   cd QRForge
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal.

### Production Build

Build the project for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🌐 Deployment

You can deploy QRForge using [Vercel](https://vercel.com/).

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Keep the build command as `npm run build`.
4. Set the output directory to `dist`.
5. Deploy your project.

## 📁 Project Structure

```text
src/
├── components/
│   ├── Field.jsx
│   ├── FormatSelector.jsx
│   ├── UrlForm.jsx
│   ├── WifiForm.jsx
│   ├── VcardForm.jsx
│   ├── StyleControls.jsx
│   ├── QrPreview.jsx
│   └── DownloadButtons.jsx
├── utils/
│   ├── buildPayload.js
│   └── contrast.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Design Philosophy

QRForge focuses on **simplicity, privacy, accessibility, and scan reliability**.

- **High contrast:** Helps scanners distinguish dark and light modules.
- **Clean design:** Keeps QR codes simple and easy to scan.
- **Logo support:** Allows logos while preserving space for error correction.
- **Privacy first:** Keeps sensitive information out of saved preferences.

Instead of adding decorative patterns that may affect scanning, QRForge prioritizes clear, reliable QR codes.

## 🔒 Privacy

- No account required.
- No backend or analytics.
- QR code generation happens in the browser.
- Preferences are stored locally using `localStorage`.
- Wi-Fi passwords, contact details, and uploaded logos are not saved in preferences.

## 👨‍💻 Author

Rakesh

---

*Built with React and a focus on privacy and usability.*
