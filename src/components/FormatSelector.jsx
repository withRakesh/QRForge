const FORMATS = [
  { value: 'url', label: 'Website URL' },
  { value: 'wifi', label: 'Wi-Fi Network' },
  { value: 'vcard', label: 'vCard Contact' },
];

/** Pill-style tab selector for the three QR formats. */
export default function FormatSelector({ format, onChange }) {
  return (
    <div role="tablist" aria-label="QR code format" className="flex gap-2">
      {FORMATS.map(({ value, label }) => (
        <button
          key={value}
          role="tab"
          aria-selected={format === value}
          onClick={() => onChange(value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
            ${format === value
              ? 'bg-accent text-black shadow-sm'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
