export function CarbonFootprintIllustration() {
  return (
    <svg
      viewBox="0 0 640 240"
      className="h-full w-full"
      role="img"
      aria-labelledby="carbon-illustration-title carbon-illustration-description"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="carbon-illustration-title">Calculadora de pegada de carbono</title>
      <desc id="carbon-illustration-description">
        Uma calculadora de CO₂ entre uma pegada ecológica, folhas e árvores em tons de verde.
      </desc>
      <rect width="640" height="240" fill="var(--accent)" />
      <circle cx="158" cy="115" r="105" fill="var(--leaf)" opacity=".12" />
      <circle cx="535" cy="115" r="112" fill="var(--leaf)" opacity=".12" />
      <path
        d="M0 190c90-28 160-22 237 0s156 25 239 0 125-24 164-12v62H0Z"
        fill="var(--leaf)"
        opacity=".14"
      />

      <g fill="var(--leaf)">
        <ellipse cx="104" cy="61" rx="7" ry="11" transform="rotate(-20 104 61)" />
        <ellipse cx="122" cy="51" rx="8" ry="11" transform="rotate(-10 122 51)" />
        <ellipse cx="142" cy="54" rx="8" ry="10" transform="rotate(8 142 54)" />
        <ellipse cx="160" cy="67" rx="7" ry="9" transform="rotate(19 160 67)" />
        <ellipse cx="172" cy="85" rx="6" ry="8" transform="rotate(28 172 85)" />
        <path d="M116 73c-18 7-30 30-36 56-6 26 3 53 24 65 15 9 37 2 44-13 7-14-2-26-11-37-8-10-11-25-9-40 2-17 1-35-12-31Z" />
      </g>
      <path
        d="M91 141c9 12 23 19 39 21"
        fill="none"
        stroke="var(--background)"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".8"
      />

      <g>
        <rect
          x="232"
          y="33"
          width="176"
          height="182"
          rx="22"
          fill="var(--background)"
          stroke="var(--forest)"
          strokeWidth="6"
        />
        <rect x="251" y="52" width="138" height="56" rx="10" fill="var(--forest)" />
        <text
          x="320"
          y="89"
          textAnchor="middle"
          fill="var(--leaf)"
          fontSize="27"
          fontWeight="700"
          fontFamily="var(--font-display), sans-serif"
        >
          CO₂
        </text>
        <text
          x="320"
          y="128"
          textAnchor="middle"
          fill="var(--forest)"
          fontSize="12"
          fontWeight="600"
          fontFamily="var(--font-sans), sans-serif"
        >
          kg de emissão
        </text>
        <circle cx="270" cy="154" r="11" fill="var(--leaf)" />
        <circle cx="320" cy="154" r="11" fill="var(--sea)" />
        <circle cx="370" cy="154" r="11" fill="var(--leaf)" />
        <circle cx="270" cy="188" r="11" fill="var(--sea)" />
        <rect x="304" y="177" width="78" height="22" rx="11" fill="var(--leaf)" />
        <path
          d="m329 188 8 7 15-17"
          fill="none"
          stroke="var(--forest)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <g fill="var(--forest)">
        <path d="M490 183h12v-52h-12z" />
        <path d="m496 68 39 57h-78z" fill="var(--leaf)" />
        <path d="m496 91 32 48h-64z" fill="var(--forest)" opacity=".88" />
        <path d="M577 183h10v-42h-10z" />
        <path d="m582 87 32 48h-64z" fill="var(--leaf)" />
        <path d="m582 108 26 39h-52z" fill="var(--forest)" opacity=".88" />
      </g>
      <g fill="var(--leaf)">
        <path d="M451 105c17-17 32-19 47-13-7 16-21 25-42 24-5 0-7-6-5-11Z" />
        <path d="M610 68c-16-9-29-8-40 1 10 12 23 15 39 9 4-2 5-7 1-10Z" />
      </g>
      <g fill="none" stroke="var(--forest)" strokeLinecap="round" strokeWidth="3" opacity=".75">
        <path d="M444 164c11-15 22-29 40-43" />
        <path d="M607 135c-7-12-14-23-27-33" />
      </g>
    </svg>
  );
}
