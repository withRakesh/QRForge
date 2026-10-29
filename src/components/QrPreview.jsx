import { QRCodeCanvas } from 'qrcode.react';

const PREVIEW_SIZE = 256;

/** Visible QR preview shown to the user. */
export default function QrPreview({ payload, fgColor, bgColor, ecLevel, logo, errors, warnings }) {
  /* Compute logo dimensions capped at 20% of QR width */
  const logoSize = logo ? Math.round(PREVIEW_SIZE * 0.2) : 0;

  const imageSettings = logo
    ? {
        src: logo,
        height: logoSize,
        width: logoSize,
        excavate: true,
      }
    : undefined;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Error messages */}
      {errors.length > 0 && (
        <div role="alert" className="w-full rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <ul className="list-disc list-inside space-y-1">
            {errors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* Warning messages */}
      {warnings.length > 0 && errors.length === 0 && (
        <div role="status" aria-live="polite" className="w-full rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
          <ul className="list-disc list-inside space-y-1">
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      {/* QR canvas */}
      {payload && errors.length === 0 ? (
        <div
          className="rounded-2xl p-4 shadow-md"
          style={{ backgroundColor: bgColor }}
          aria-label="QR code preview"
        >
          <QRCodeCanvas
            value={payload}
            size={PREVIEW_SIZE}
            fgColor={fgColor}
            bgColor={bgColor}
            level={ecLevel}
            imageSettings={imageSettings}
          />
        </div>
      ) : (
        !errors.length && (
          <div
            className="flex items-center justify-center rounded-2xl bg-gray-100 text-gray-400 text-sm"
            style={{ width: PREVIEW_SIZE + 32, height: PREVIEW_SIZE + 32 }}
          >
            Fill in the form to see a preview
          </div>
        )
      )}
    </div>
  );
}
