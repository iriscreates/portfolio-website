'use client';

import { useState } from 'react';

const EMAIL_ADDRESS = 'irisyu07@gmail.com';

export function CopyEmailLink() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    let didCopy = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(EMAIL_ADDRESS);
        didCopy = true;
      }
    } catch {
      didCopy = false;
    }

    if (!didCopy) {
      const fallback = document.createElement('textarea');
      fallback.value = EMAIL_ADDRESS;
      fallback.setAttribute('readonly', '');
      fallback.style.position = 'fixed';
      fallback.style.opacity = '0';
      document.body.appendChild(fallback);
      fallback.select();
      didCopy = document.execCommand('copy');
      fallback.remove();
    }

    setCopied(didCopy);
    if (didCopy) {
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      className="landing-footer-copy-link"
      type="button"
      onClick={copyEmail}
      aria-label={copied ? 'Email copied to clipboard' : 'Copy email address'}
    >
      <img src="/icons/contact/gmail.svg" alt="" aria-hidden="true" width="20" height="20" />
      <span aria-live="polite">{copied ? 'Copied!' : 'Email'}</span>
    </button>
  );
}
