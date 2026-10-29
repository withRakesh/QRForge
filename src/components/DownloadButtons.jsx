import { useRef } from 'react';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';

const EXPORT_SIZE = 1024;

/** Hidden high-res renderers + download buttons. */
export default function DownloadButtons({ payload, fgColor, bgColor, ecLevel, logo }) {
  const canvasRef = useRef(null);

  if (!payload) return null;

  /* Compute logo size as 20% of export size */
  const logoSize = logo ? Math.round(EXPORT_SIZE * 0.2) : 0;
  const imageSettings = logo
    ? { src: logo, height: logoSize, width: logoSize, excavate: true }
    : undefined;

  const downloadPng = () => {
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'qrforge.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const downloadSvg = () => {
    const svgEl = canvasRef.current?.querySelector('svg');
    if (!svgEl) return;
    const blob = new Blob(
      [new XMLSerializer().serializeToString(svgEl)],
      { type: 'image/svg+xml' }
    );
    const link = document.createElement('a');
    link.download = 'qrforge.svg';
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Hidden high-res export layer — must be rendered (not display:none) so canvas paints */}
      <div
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: EXPORT_SIZE,
          height: EXPORT_SIZE * 2,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <QRCodeCanvas
          value={payload}
          size={EXPORT_SIZE}
          fgColor={fgColor}
          bgColor={bgColor}
          level={ecLevel}
          imageSettings={imageSettings}
        />
        <QRCodeSVG
          value={payload}
          size={EXPORT_SIZE}
          fgColor={fgColor}
          bgColor={bgColor}
          level={ecLevel}
          imageSettings={imageSettings}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={downloadPng}
          className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition cursor-pointer"
        >
          ↓ Download PNG
        </button>
        <button
          type="button"
          onClick={downloadSvg}
          className="flex-1 rounded-lg border border-indigo-600 px-4 py-2.5 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 transition cursor-pointer"
        >
          ↓ Download SVG
        </button>
      </div>
    </div>
  );
}
