import { useRef } from 'react';
import { contrastRatio, luminance } from '../utils/contrast.js';

const EC_LEVELS = ['L', 'M', 'Q', 'H'];

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 ' +
  'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition';

/** Style controls: colours, EC level, logo upload. */
export default function StyleControls({
  fgColor,
  bgColor,
  ecLevel,
  logo,
  hasLogo,
  onFgChange,
  onBgChange,
  onEcChange,
  onLogoChange,
}) {
  const fileRef = useRef(null);

  /* WCAG contrast info */
  const ratio = contrastRatio(fgColor, bgColor);
  const ratioStr = ratio.toFixed(2);
  const fgLum = luminance(fgColor);
  const bgLum = luminance(bgColor);
  const fgLighter = fgLum > bgLum;
  const contrastOk = ratio >= 4.0 && !fgLighter;

  /* Warn if EC is reduced below H while a logo is present */
  const ecWarn = hasLogo && ecLevel !== 'H';

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ['image/png', 'image/jpeg', 'image/svg+xml'];
    if (!allowed.includes(file.type)) {
      alert('Please upload a PNG, JPG, or SVG file.');
      return;
    }
    if (file.size > 500 * 1024) {
      alert('Logo must be smaller than 500 KB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => onLogoChange(ev.target.result);
    reader.readAsDataURL(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Colour pickers */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="fg-color" className="text-sm font-medium text-gray-700">
            Foreground
          </label>
          <div className="flex items-center gap-2">
            <input
              id="fg-color"
              type="color"
              value={fgColor}
              onChange={(e) => onFgChange(e.target.value)}
              className="h-9 w-14 cursor-pointer rounded border border-gray-300 p-0.5"
            />
            <span className="text-xs text-gray-500 font-mono">{fgColor}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="bg-color" className="text-sm font-medium text-gray-700">
            Background
          </label>
          <div className="flex items-center gap-2">
            <input
              id="bg-color"
              type="color"
              value={bgColor}
              onChange={(e) => onBgChange(e.target.value)}
              className="h-9 w-14 cursor-pointer rounded border border-gray-300 p-0.5"
            />
            <span className="text-xs text-gray-500 font-mono">{bgColor}</span>
          </div>
        </div>
      </div>

      {/* Contrast badge */}
      <div
        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
          contrastOk ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }`}
        role="status"
        aria-live="polite"
      >
        <span className="font-semibold">Contrast {ratioStr}:1</span>
        {!contrastOk && (
          <span>
            {fgLighter
              ? '— foreground is lighter than background (hard to scan)'
              : '— below 4:1 (WCAG AA)'}
          </span>
        )}
        {contrastOk && <span>— good contrast ✓</span>}
      </div>

      {/* Error correction */}
      <div className="flex flex-col gap-1">
        <label htmlFor="ec-level" className="text-sm font-medium text-gray-700">
          Error Correction
        </label>
        <select
          id="ec-level"
          className={inputCls}
          value={ecLevel}
          onChange={(e) => onEcChange(e.target.value)}
        >
          {EC_LEVELS.map((l) => (
            <option key={l} value={l}>
              {l} – {ecLabel(l)}
            </option>
          ))}
        </select>
        {ecWarn && (
          <p role="alert" className="text-xs text-amber-600">
            A logo is present — keeping EC at H gives the best scan reliability.
          </p>
        )}
      </div>

      {/* Logo upload */}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-medium text-gray-700">Center Logo (optional)</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            {hasLogo ? 'Replace logo' : 'Upload logo'}
          </button>
          {hasLogo && (
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Remove
            </button>
          )}
          <span className="text-xs text-gray-400">PNG / JPG / SVG, max 500 KB</span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/svg+xml"
          className="hidden"
          onChange={handleFile}
          aria-label="Upload center logo"
        />
      </div>
    </div>
  );
}

function ecLabel(l) {
  return { L: '~7% recovery', M: '~15% recovery', Q: '~25% recovery', H: '~30% recovery' }[l];
}
