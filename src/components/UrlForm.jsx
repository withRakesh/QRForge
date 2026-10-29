import { useState } from 'react';
import Field from './Field.jsx';

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 ' +
  'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition';

/** Form for Website URL format. */
export default function UrlForm({ fields, onChange }) {
  const [touched, setTouched] = useState({});

  const handleBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const urlError = touched.url && !fields.url?.trim()
    ? 'Please enter a URL.'
    : null;

  return (
    <Field id="url" label="Website URL" error={urlError}>
      <input
        type="url"
        className={inputCls}
        placeholder="example.com"
        value={fields.url || ''}
        onChange={(e) => onChange({ url: e.target.value })}
        onBlur={() => handleBlur('url')}
        autoComplete="url"
      />
    </Field>
  );
}
