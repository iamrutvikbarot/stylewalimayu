import React from 'react';

export function BlueVerifiedTick({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Verified creator"
      role="img"
    >
      <title>Verified</title>
      {/* Official Instagram-style scalloped verified blue badge */}
      <path
        d="M10.52 2.5a2.12 2.12 0 0 1 2.96 0l.96.95c.4.4.95.63 1.52.63h1.34a2.12 2.12 0 0 1 2.12 2.12v1.34c0 .57.23 1.12.63 1.52l.95.96a2.12 2.12 0 0 1 0 2.96l-.95.96c-.4.4-.63.95-.63 1.52v1.34a2.12 2.12 0 0 1-2.12 2.12h-1.34c-.57 0-1.12.23-1.52.63l-.96.95a2.12 2.12 0 0 1-2.96 0l-.96-.95c-.4-.4-.95-.63-1.52-.63H6.24a2.12 2.12 0 0 1-2.12-2.12v-1.34c0-.57-.23-1.12-.63-1.52l-.95-.96a2.12 2.12 0 0 1 0-2.96l.95-.96c.4-.4.63-.95.63-1.52V6.24a2.12 2.12 0 0 1 2.12-2.12h1.34c.57 0 1.12-.23 1.52-.63l.96-.95Z"
        fill="#0095F6"
      />
      {/* Clean White Checkmark */}
      <path
        d="M8.7 12.3l2.2 2.2 4.6-4.6"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
