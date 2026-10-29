import { useState } from 'react';
import Field from './Field.jsx';

const inputCls =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 ' +
  'focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition';

/** Form for vCard contact QR format. */
export default function VcardForm({ fields, onChange }) {
  const [touched, setTouched] = useState({});
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const nameError = touched.name && !fields.name?.trim()
    ? 'Full name is required.'
    : null;

  const emailError =
    touched.email &&
    fields.email?.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())
      ? 'Email address looks invalid.'
      : null;

  return (
    <div className="flex flex-col gap-4">
      <Field id="vcard-name" label="Full Name" error={nameError}>
        <input
          type="text"
          className={inputCls}
          placeholder="Jane Smith"
          value={fields.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          onBlur={() => touch('name')}
          autoComplete="name"
        />
      </Field>

      <Field id="vcard-phone" label="Phone (optional)">
        <input
          type="tel"
          className={inputCls}
          placeholder="+1 555 000 0000"
          value={fields.phone || ''}
          onChange={(e) => onChange({ phone: e.target.value })}
          autoComplete="tel"
        />
      </Field>

      <Field id="vcard-email" label="Email (optional)" error={emailError}>
        <input
          type="email"
          className={inputCls}
          placeholder="jane@example.com"
          value={fields.email || ''}
          onChange={(e) => onChange({ email: e.target.value })}
          onBlur={() => touch('email')}
          autoComplete="email"
        />
      </Field>
    </div>
  );
}
