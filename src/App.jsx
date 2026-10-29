import { useState, useEffect, useCallback, useMemo } from 'react';
import FormatSelector from './components/FormatSelector.jsx';
import UrlForm from './components/UrlForm.jsx';
import WifiForm from './components/WifiForm.jsx';
import VcardForm from './components/VcardForm.jsx';
import StyleControls from './components/StyleControls.jsx';
import QrPreview from './components/QrPreview.jsx';
import DownloadButtons from './components/DownloadButtons.jsx';
import Hero from './Layouts.js/Hero.jsx';
import Footer from './Layouts.js/Footer.jsx';
import { buildPayload } from './utils/buildPayload.js';

const LogoIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2" />
    <path d="M14 14h3v3m4 0v4h-4m-3-1v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* One card style for every panel, so spacing and shadows stay consistent.
   Smaller padding on mobile, larger from the sm breakpoint up. */
function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_10px_30px_-14px_rgba(15,23,42,0.14)] sm:p-6">
      <h3 className="mb-3 text-base font-semibold text-ink sm:mb-4">{title}</h3>
      {children}
    </section>
  );
}

/* ── localStorage helpers ─────────────────────────────────────── */
const STORAGE_KEY = 'qrforge_prefs';

const VALID_FORMATS = ['url', 'wifi', 'vcard'];
const VALID_EC = ['L', 'M', 'Q', 'H'];
const HEX_RE = /^#[0-9a-fA-F]{6}$/;

function loadPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return {
      format: VALID_FORMATS.includes(p.format) ? p.format : 'url',
      fgColor: HEX_RE.test(p.fgColor) ? p.fgColor : '#000000',
      bgColor: HEX_RE.test(p.bgColor) ? p.bgColor : '#ffffff',
      ecLevel: VALID_EC.includes(p.ecLevel) ? p.ecLevel : 'M',
    };
  } catch {
    return null;
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* Storage might be full or blocked, so ignore */
  }
}

/* ── Default field sets per format ───────────────────────────────*/
const DEFAULT_FIELDS = {
  url: { url: '' },
  wifi: { ssid: '', password: '', security: 'WPA' },
  vcard: { name: '', phone: '', email: '' },
};

/* ── App ─────────────────────────────────────────────────────── */
export default function App() {
  // Read storage once, not on every render
  const [initial] = useState(loadPrefs);

  const [format, setFormat] = useState(initial?.format ?? 'url');
  const [fgColor, setFgColor] = useState(initial?.fgColor ?? '#000000');
  const [bgColor, setBgColor] = useState(initial?.bgColor ?? '#ffffff');
  const [ecLevel, setEcLevel] = useState(initial?.ecLevel ?? 'M');
  const [logo, setLogo] = useState(null); // data URL or null
  // Fields keyed by format so switching back restores state
  const [fieldsByFormat, setFieldsByFormat] = useState(DEFAULT_FIELDS);

  const fields = fieldsByFormat[format];

  /* Persist non-sensitive prefs */
  useEffect(() => {
    savePrefs({ format, fgColor, bgColor, ecLevel });
  }, [format, fgColor, bgColor, ecLevel]);

  /* Auto-switch EC to H when a logo is uploaded */
  const handleLogoChange = useCallback(
    (dataUrl) => {
      setLogo(dataUrl);
      if (dataUrl && ecLevel !== 'H') setEcLevel('H');
    },
    [ecLevel]
  );

  const handleFieldChange = useCallback(
    (patch) => {
      setFieldsByFormat((prev) => ({
        ...prev,
        [format]: { ...prev[format], ...patch },
      }));
    },
    [format]
  );

  const { payload, errors, warnings } = useMemo(
    () => buildPayload(format, fields, ecLevel),
    [format, fields, ecLevel]
  );

  const canDownload = Boolean(payload) && errors.length === 0;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F3F8F6] text-ink">
      <a
        href="#generator"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:text-ink focus:shadow-lg"
      >
        Skip to generator
      </a>

      {/* Header: same green as the hero, so the two read as one block */}
      <header className="bg-canvas px-4 py-3 sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink text-white shadow-[0_6px_16px_-6px_rgba(6,78,59,0.6)]">
            <LogoIcon />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink sm:text-xl">QRForge</span>
        </div>
      </header>

      <Hero />

      {/* Generator */}
      <main id="generator" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        <div className="mb-6 max-w-xl sm:mb-8">
          <h2 className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl lg:text-3xl">
            Create your QR code
          </h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            Pick a type, add your details, then download. The preview updates as you type.
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:gap-8 lg:flex-row lg:items-start lg:gap-10">
          {/* Left column: form (min-w-0 stops inputs from forcing horizontal scroll) */}
          <div className="flex w-full min-w-0 flex-col gap-4 sm:gap-6 lg:flex-1">
            <FormatSelector format={format} onChange={setFormat} />

            <Card title="Content">
              {format === 'url' && <UrlForm fields={fields} onChange={handleFieldChange} />}
              {format === 'wifi' && <WifiForm fields={fields} onChange={handleFieldChange} />}
              {format === 'vcard' && <VcardForm fields={fields} onChange={handleFieldChange} />}
            </Card>

            <Card title="Style">
              <StyleControls
                fgColor={fgColor}
                bgColor={bgColor}
                ecLevel={ecLevel}
                logo={logo}
                hasLogo={!!logo}
                onFgChange={setFgColor}
                onBgChange={setBgColor}
                onEcChange={setEcLevel}
                onLogoChange={handleLogoChange}
              />
            </Card>
          </div>

          {/* Right column: full width on mobile, fixed width + sticky on desktop.
              Add "order-first lg:order-none" to the className below if you want
              the preview to appear above the form on phones. */}
          <aside
            className="flex w-full min-w-0 flex-col gap-4 sm:gap-6 lg:sticky lg:top-8 lg:w-80 lg:shrink-0"
            aria-label="QR code preview and download"
          >
            <Card title="Preview">
              <QrPreview
                payload={payload}
                fgColor={fgColor}
                bgColor={bgColor}
                ecLevel={ecLevel}
                logo={logo}
                errors={errors}
                warnings={warnings}
              />
            </Card>

            {/* Always rendered, so the layout doesn't jump when the content becomes valid */}
            <Card title="Download">
              {canDownload ? (
                <DownloadButtons
                  payload={payload}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  ecLevel={ecLevel}
                  logo={logo}
                />
              ) : (
                <p className="text-sm text-slate-500">
                  Fill in the content to enable PNG and SVG downloads.
                </p>
              )}
            </Card>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}