import { useState } from 'react';
import Field from './Field.jsx';

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 ' +
  'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition';

const SECURITY_OPTIONS = [
  { value: 'WPA', label: 'WPA / WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'None (open network)' },
];

/** Form for Wi-Fi QR format. */
export default function WifiForm({ fields, onChange }) {
  const [touched, setTouched] = useState({});
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const ssidError = touched.ssid && !fields.ssid?.trim()
    ? 'Network name (SSID) is required.'
    : null;

  const noPassword = fields.security === 'nopass';

  return (
    <div className="flex flex-col gap-4">
      <Field id="ssid" label="Network Name (SSID)" error={ssidError}>
        <input
          type="text"
          className={inputCls}
          placeholder="MyHomeNetwork"
          value={fields.ssid || ''}
          onChange={(e) => onChange({ ssid: e.target.value })}
          onBlur={() => touch('ssid')}
          autoComplete="off"
        />
      </Field>

      <Field id="wifi-security" label="Security">
        <select
          className={inputCls}
          value={fields.security || 'WPA'}
          onChange={(e) => onChange({ security: e.target.value })}
        >
          {SECURITY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </Field>

      {!noPassword && (
        <Field id="wifi-password" label="Password">
          <input
            type="text"
            className={inputCls}
            placeholder="Your Wi-Fi password"
            value={fields.password || ''}
            onChange={(e) => onChange({ password: e.target.value })}
            autoComplete="off"
          />
        </Field>
      )}
    </div>
  );
}
