/**
 * QR capacity limits (bytes) per error-correction level.
 * Source: ISO/IEC 18004 — Version 40, binary mode.
 * We use a conservative practical limit.
 */
const QR_CAPACITY = { L: 2953, M: 2331, Q: 1663, H: 1273 };

/** Escape characters that have special meaning in Wi-Fi QR strings. */
function wifiEscape(str) {
  return str.replace(/[\\;,":]/g, (ch) => '\\' + ch);
}

/** Escape characters that have special meaning in vCard. */
function vcardEscape(str) {
  return str.replace(/[\\,;]/g, (ch) => '\\' + ch);
}

/**
 * Build the QR payload string and validate it.
 *
 * @param {'url'|'wifi'|'vcard'} format
 * @param {Object} fields  – raw form values
 * @param {'L'|'M'|'Q'|'H'} ecLevel
 * @returns {{ payload: string, errors: string[], warnings: string[] }}
 */
export function buildPayload(format, fields, ecLevel) {
  const errors = [];
  const warnings = [];
  let payload = '';

  if (format === 'url') {
    let url = (fields.url || '').trim();

    // Empty URL → no payload, no error (form handles the "required" message via touch)
    if (url) {
      // Auto-add https:// if no scheme present
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
      }
      try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
          errors.push('Only http:// and https:// URLs are supported.');
        } else {
          payload = url;
        }
      } catch {
        errors.push("That doesn't look like a valid URL.");
      }
    }
  } else if (format === 'wifi') {
    const ssid = (fields.ssid || '').trim();
    const password = (fields.password || '').trim();
    const security = fields.security || 'WPA';

    // Only build payload when SSID is present
    if (ssid) {
      const esc = wifiEscape;
      if (security === 'nopass') {
        payload = `WIFI:T:nopass;S:${esc(ssid)};;`;
      } else {
        payload = `WIFI:T:${security};S:${esc(ssid)};P:${esc(password)};;`;
      }
    }
  } else if (format === 'vcard') {
    const name = (fields.name || '').trim();
    const phone = (fields.phone || '').trim();
    const email = (fields.email || '').trim();

    // Validate email format regardless
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Email address looks invalid.');
    }

    // Only build payload when name is present and no errors
    if (name && !errors.length) {
      const esc = vcardEscape;
      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${esc(name)}`,
      ];
      if (phone) lines.push(`TEL:${phone}`);
      if (email) lines.push(`EMAIL:${esc(email)}`);
      lines.push('END:VCARD');
      payload = lines.join('\n');
    }
  }

  if (payload) {
    const byteLength = new TextEncoder().encode(payload).length;
    const capacity = QR_CAPACITY[ecLevel];

    if (byteLength > capacity) {
      errors.push(
        `Content is too long for QR error correction level ${ecLevel} (${byteLength} bytes; max ${capacity}). ` +
        'Try a lower EC level or shorten your content.'
      );
    } else if (byteLength > 300) {
      warnings.push(
        `Long content (${byteLength} bytes) may produce a dense QR code that's harder to scan.`
      );
    }
  }

  return { payload: errors.length ? '' : payload, errors, warnings };
}
