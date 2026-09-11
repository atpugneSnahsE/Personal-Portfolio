export default function ProfileIllustration() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-zinc-900 dark:to-black rounded-lg flex items-center justify-center p-8">
      <svg
        viewBox="0 0 300 400"
        className="w-full h-full max-w-sm"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="300" height="400" fill="none" />

        {/* Hair */}
        <path
          d="M 80 100 Q 70 80 90 60 Q 120 40 150 35 Q 180 40 210 60 Q 230 80 220 100 Z"
          fill="#1a1a1a"
          className="dark:fill-gray-900"
        />

        {/* Head */}
        <ellipse cx="150" cy="120" rx="55" ry="65" fill="#d4a574" />

        {/* Glasses frame left */}
        <rect x="95" y="110" width="28" height="22" rx="4" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        {/* Glasses lens left */}
        <rect x="97" y="112" width="24" height="18" rx="3" fill="#e8f4f8" opacity="0.5" />

        {/* Glasses frame right */}
        <rect x="177" y="110" width="28" height="22" rx="4" fill="none" stroke="#1a1a1a" strokeWidth="2" />
        {/* Glasses lens right */}
        <rect x="179" y="112" width="24" height="18" rx="3" fill="#e8f4f8" opacity="0.5" />

        {/* Glasses bridge */}
        <line x1="123" y1="121" x2="177" y2="121" stroke="#1a1a1a" strokeWidth="2" />

        {/* Eyes */}
        <circle cx="109" cy="118" r="3" fill="#1a1a1a" />
        <circle cx="191" cy="118" r="3" fill="#1a1a1a" />

        {/* Nose */}
        <path
          d="M 150 125 L 150 140"
          stroke="#1a1a1a"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Mouth - friendly smile */}
        <path
          d="M 135 150 Q 150 160 165 150"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Beard stubble */}
        <line x1="110" y1="155" x2="120" y2="157" stroke="#8b6f47" strokeWidth="1" opacity="0.6" />
        <line x1="180" y1="155" x2="190" y2="157" stroke="#8b6f47" strokeWidth="1" opacity="0.6" />

        {/* Neck */}
        <rect x="130" y="175" width="40" height="20" fill="#d4a574" />

        {/* Hoodie - Blue */}
        <path
          d="M 80 195 Q 75 190 80 170 L 220 170 Q 225 190 220 195 Z"
          fill="#60a5fa"
        />

        {/* Hoodie main body */}
        <ellipse cx="150" cy="270" rx="90" ry="80" fill="#3b82f6" />

        {/* Hoodie hood */}
        <path
          d="M 120 180 Q 120 160 150 150 Q 180 160 180 180"
          fill="#2563eb"
        />

        {/* Hoodie details - pocket area */}
        <rect x="125" y="260" width="18" height="30" rx="3" fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.5" />
        <rect x="157" y="260" width="18" height="30" rx="3" fill="none" stroke="#1e40af" strokeWidth="1.5" opacity="0.5" />

        {/* Arms */}
        <ellipse cx="70" cy="260" rx="22" ry="50" fill="#3b82f6" transform="rotate(-25 70 260)" />
        <ellipse cx="230" cy="260" rx="22" ry="50" fill="#3b82f6" transform="rotate(25 230 260)" />

        {/* Hands */}
        <ellipse cx="55" cy="300" rx="15" ry="20" fill="#d4a574" />
        <ellipse cx="245" cy="300" rx="15" ry="20" fill="#d4a574" />

        {/* Shirt underneath */}
        <rect x="100" y="195" width="100" height="15" fill="#1a1a1a" opacity="0.1" />

        {/* Decorative element - AI symbol */}
        <g opacity="0.2" transform="translate(250, 80)">
          <text fontSize="24" fill="#10b981" fontWeight="bold">
            AI
          </text>
        </g>
      </svg>
    </div>
  );
}
