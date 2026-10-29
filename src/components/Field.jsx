import { cloneElement } from 'react';

/**
 * A labelled form field with inline error support.
 * Pass any single input/select/textarea as the child;
 * aria-invalid and aria-describedby are injected automatically.
 */
export default function Field({ id, label, error, children }) {
  const errorId = `${id}-error`;
  const child = cloneElement(children, {
    id,
    ...(error && { 'aria-invalid': 'true', 'aria-describedby': errorId }),
  });

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      {child}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
