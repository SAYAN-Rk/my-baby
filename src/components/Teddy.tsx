import React from 'react';

type Props = {
  bounce?: boolean;
  nod?: boolean;
  happy?: boolean;
  size?: number;
  className?: string;
};

export default function Teddy({ bounce = true, nod = false, happy = false, size = 100, className = '' }: Props) {
  let animClass = className;
  if (happy) animClass += ' teddy-happy';
  else if (nod) animClass += ' teddy-nod';
  else if (bounce) animClass += ' teddy-bounce';

  return (
    <div style={{ width: size, height: size }} className={animClass}>
      <svg viewBox="0 0 100 120" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        {/* Body */}
        <ellipse cx="50" cy="70" rx="28" ry="35" fill="#8B4513" stroke="#704214" strokeWidth="1" />

        {/* Head */}
        <circle cx="50" cy="35" r="22" fill="#8B4513" stroke="#704214" strokeWidth="1" />

        {/* Left ear */}
        <circle cx="30" cy="15" r="12" fill="#8B4513" stroke="#704214" strokeWidth="1" />
        <circle cx="30" cy="15" r="6" fill="#A0522D" />

        {/* Right ear */}
        <circle cx="70" cy="15" r="12" fill="#8B4513" stroke="#704214" strokeWidth="1" />
        <circle cx="70" cy="15" r="6" fill="#A0522D" />

        {/* Snout */}
        <ellipse cx="50" cy="40" rx="14" ry="12" fill="#D2B48C" stroke="#A0826D" strokeWidth="0.8" />

        {/* Eyes */}
        <circle cx="42" cy="31" r="3.5" fill="#000" />
        <circle cx="43.5" cy="29" r="1.2" fill="#fff" opacity="0.7" />
        <circle cx="58" cy="31" r="3.5" fill="#000" />
        <circle cx="59.5" cy="29" r="1.2" fill="#fff" opacity="0.7" />

        {/* Nose */}
        <ellipse cx="50" cy="41" rx="2.5" ry="2" fill="#000" />

        {/* Mouth */}
        <path d="M 50 43 Q 45 45 42 44" stroke="#704214" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M 50 43 Q 55 45 58 44" stroke="#704214" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Belly */}
        <ellipse cx="50" cy="75" rx="18" ry="22" fill="#D2B48C" stroke="#A0826D" strokeWidth="0.8" />

        {/* Left arm */}
        <ellipse cx="26" cy="60" rx="9" ry="16" fill="#8B4513" stroke="#704214" strokeWidth="0.8" transform="rotate(-25 26 60)" />
        <circle cx="23" cy="73" r="6" fill="#8B4513" stroke="#704214" strokeWidth="0.8" />

        {/* Right arm */}
        <ellipse cx="74" cy="60" rx="9" ry="16" fill="#8B4513" stroke="#704214" strokeWidth="0.8" transform="rotate(25 74 60)" />
        <circle cx="77" cy="73" r="6" fill="#8B4513" stroke="#704214" strokeWidth="0.8" />

        {/* Left foot */}
        <ellipse cx="38" cy="103" rx="9" ry="12" fill="#8B4513" stroke="#704214" strokeWidth="0.8" />
        <ellipse cx="38" cy="105" rx="5.5" ry="7" fill="#704214" />

        {/* Right foot */}
        <ellipse cx="62" cy="103" rx="9" ry="12" fill="#8B4513" stroke="#704214" strokeWidth="0.8" />
        <ellipse cx="62" cy="105" rx="5.5" ry="7" fill="#704214" />
      </svg>
    </div>
  );
}
