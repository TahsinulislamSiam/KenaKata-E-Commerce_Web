import { useId } from 'react';
import cn from '@/utils/cn';

/** The gold monogram crest: serif K inside a double ring. */
function Crest({ size = 36, className }) {
  const gradientId = useId();

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      role="img"
      aria-label="KenaKata monogram"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d67d" />
          <stop offset="0.5" stopColor="#d4a51d" />
          <stop offset="1" stopColor="#a37c11" />
        </linearGradient>
      </defs>
      {/* Emerald disc so the crest reads on any background */}
      <circle cx="32" cy="32" r="31" fill="#0a4235" />
      <circle cx="32" cy="32" r="28.5" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.4" />
      <circle
        cx="32"
        cy="32"
        r="25"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="0.9"
        opacity="0.65"
      />
      <text
        x="32"
        y="43"
        textAnchor="middle"
        fontFamily="'Playfair Display', Georgia, serif"
        fontSize="31"
        fontWeight="700"
        fill={`url(#${gradientId})`}
      >
        K
      </text>
    </svg>
  );
}

/**
 * KenaKata brand logo — gold monogram crest + letterspaced serif wordmark.
 * @param {{size?: number, showWord?: boolean, tagline?: boolean, responsiveWord?: boolean,
 *          className?: string, wordClassName?: string}} props
 */
export default function Logo({
  size = 36,
  showWord = true,
  tagline = false,
  responsiveWord = false,
  className,
  wordClassName,
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <Crest size={size} />
      {showWord && (
        <span
          className={cn('flex flex-col gap-1 leading-none', responsiveWord && 'hidden sm:flex')}
        >
          <span
            className={cn(
              'font-display text-lg font-bold uppercase leading-none tracking-[0.24em]',
              wordClassName
            )}
          >
            KenaKata
          </span>
          {tagline && (
            <span
              className={cn(
                'font-sans text-[8.5px] font-semibold uppercase leading-none tracking-[0.42em] opacity-75',
                wordClassName
              )}
            >
              Marketplace
            </span>
          )}
        </span>
      )}
    </span>
  );
}

export { Crest };
