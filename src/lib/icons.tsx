export function ArrowIcon() {
  return (
    <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg className="globe-icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 010 18 15 15 0 010-18z" />
    </svg>
  );
}

export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 8c-2 0-3.5 1.5-3.5 4S5 16 7 16c1.5 0 2.5-1 2.5-2.5S8.5 11 7 11c-.3 0-.6 0-.8.1C6.6 9.4 8 8.3 10 8V6c-1 0-2 .3-3 .5V8zm10 0c-2 0-3.5 1.5-3.5 4s1.5 4 3.5 4c1.5 0 2.5-1 2.5-2.5S18.5 11 17 11c-.3 0-.6 0-.8.1.4-1.7 1.8-2.8 3.8-3.1V6c-1 0-2 .3-3 .5V8z" />
    </svg>
  );
}
