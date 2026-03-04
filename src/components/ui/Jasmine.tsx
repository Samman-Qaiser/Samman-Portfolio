function JasmineSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="10 5 285 405"
      width="460"
      height="460"
      aria-label="Jasmine Flower Branch"
    >
      <defs>
        {/* Leaf gradient - dark green with highlight */}
        <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3d7535" />
          <stop offset="50%" stopColor="#2a5e28" />
          <stop offset="100%" stopColor="#1c4420" />
        </linearGradient>
        <linearGradient id="lg2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d7535" />
          <stop offset="50%" stopColor="#2a5e28" />
          <stop offset="100%" stopColor="#1c4420" />
        </linearGradient>
        <linearGradient id="lg3" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2a5e28" />
          <stop offset="100%" stopColor="#3d7535" />
        </linearGradient>
        <linearGradient id="lg4" x1="100%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#2a5e28" />
          <stop offset="100%" stopColor="#3d7535" />
        </linearGradient>

        {/* Petal gradient - creamy white with soft green edge */}
        <radialGradient id="pg1" cx="50%" cy="70%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#f5f8f0" />
          <stop offset="100%" stopColor="#dde8d0" />
        </radialGradient>
        <radialGradient id="pg2" cx="50%" cy="70%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#f5f8f0" />
          <stop offset="100%" stopColor="#d8e4cc" />
        </radialGradient>

        {/* Petal shaded (back petals) */}
        <radialGradient id="pgShade" cx="50%" cy="60%" r="65%">
          <stop offset="0%" stopColor="#f0f5ea" />
          <stop offset="70%" stopColor="#e0eacc" />
          <stop offset="100%" stopColor="#c8d8b8" />
        </radialGradient>

        {/* Bud green gradient */}
        <linearGradient id="budGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5a8a44" />
          <stop offset="100%" stopColor="#2a5e28" />
        </linearGradient>

        {/* Stamen center */}
        <radialGradient id="stamenCenter" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#f5d020" />
          <stop offset="60%" stopColor="#e8b820" />
          <stop offset="100%" stopColor="#c89010" />
        </radialGradient>

        {/* Stem gradient */}
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#4a7038" />
          <stop offset="50%" stopColor="#567a40" />
          <stop offset="100%" stopColor="#3a5e2c" />
        </linearGradient>
      </defs>

      {/* ═══════════════════════════════
          STEM & BRANCHES
         ═══════════════════════════════ */}
      {/* Main stem */}
      <path
        d="M 152 405 C 151 375 150 340 151 310 C 152 280 151 250 150 220 C 149 190 149 165 148 140 C 147 115 146 90 143 65"
        stroke="#567a40" strokeWidth="5.5" fill="none" strokeLinecap="round"
      />
      {/* Upper left branch (to left flower) */}
      <path
        d="M 146 120 C 138 108 128 96 118 85 C 110 76 102 70 96 62"
        stroke="#567a40" strokeWidth="4" fill="none" strokeLinecap="round"
      />
      {/* Upper right branch (to right-top flower) */}
      <path
        d="M 148 105 C 158 94 168 83 178 73 C 186 65 193 59 200 53"
        stroke="#567a40" strokeWidth="4" fill="none" strokeLinecap="round"
      />
      {/* Right side branch (to right flower) */}
      <path
        d="M 151 220 C 165 215 182 210 198 207 C 213 204 225 202 237 200"
        stroke="#567a40" strokeWidth="3.5" fill="none" strokeLinecap="round"
      />
      {/* Small bud branch top */}
      <path
        d="M 143 68 C 137 60 132 54 128 48"
        stroke="#567a40" strokeWidth="3" fill="none" strokeLinecap="round"
      />
      {/* Small branch for bud near right */}
      <path
        d="M 198 207 C 206 198 212 190 216 182"
        stroke="#4a7038" strokeWidth="2.5" fill="none" strokeLinecap="round"
      />

      {/* ═══════════════════════════════
          LARGE BOTTOM LEAVES (behind)
         ═══════════════════════════════ */}
      {/* Bottom-left large leaf */}
      <g transform="translate(150,330)">
        <path
          d="M 2,0 C -8,-8 -35,-18 -65,-22 C -90,-25 -108,-18 -108,-8 C -108,2 -90,14 -65,18 C -38,22 -10,16 2,0 Z"
          fill="url(#lg1)"
        />
        {/* Midrib */}
        <path d="M 2,0 C -25,2 -70,0 -108,-8" stroke="#1c4420" strokeWidth="1.3" fill="none" opacity="0.6"/>
        {/* Side veins */}
        <path d="M -25,-1 C -28,-12 -32,-20 -38,-22" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -50,0 C -53,-12 -58,-20 -65,-22" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -75,0 C -78,-10 -83,-16 -88,-18" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -25,2 C -27,12 -30,18 -34,20" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -50,2 C -52,12 -56,18 -62,19" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        {/* Highlight */}
        <path d="M -10,-5 C -30,-14 -58,-18 -80,-16" stroke="#4a8040" strokeWidth="1.2" fill="none" opacity="0.35"/>
      </g>

      {/* Bottom-right large leaf */}
      <g transform="translate(152,345)">
        <path
          d="M -2,0 C 8,-8 35,-16 65,-20 C 90,-23 110,-16 110,-6 C 110,4 90,16 65,20 C 38,24 10,18 -2,0 Z"
          fill="url(#lg2)"
        />
        <path d="M -2,0 C 25,2 70,2 110,-6" stroke="#1c4420" strokeWidth="1.3" fill="none" opacity="0.6"/>
        <path d="M 25,-1 C 28,-12 32,-18 38,-20" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 50,0 C 53,-12 58,-18 65,-20" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 78,0 C 80,-10 84,-15 90,-16" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 25,2 C 27,12 30,18 34,20" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 52,2 C 54,12 58,18 64,19" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 10,-4 C 32,-13 60,-17 82,-15" stroke="#4a8040" strokeWidth="1.2" fill="none" opacity="0.35"/>
      </g>

      {/* ═══════════════════════════════
          MIDDLE LEAVES
         ═══════════════════════════════ */}
      {/* Middle-left leaf */}
      <g transform="translate(149,242)">
        <path
          d="M 2,0 C -5,-10 -30,-24 -62,-32 C -85,-37 -105,-30 -105,-18 C -105,-8 -85,6 -62,10 C -35,15 -8,10 2,0 Z"
          fill="url(#lg3)"
        />
        <path d="M 2,0 C -22,0 -65,-5 -105,-18" stroke="#1c4420" strokeWidth="1.3" fill="none" opacity="0.6"/>
        <path d="M -20,-5 C -24,-18 -28,-26 -35,-30" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -48,-8 C -52,-20 -56,-28 -62,-32" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -75,-10 C -78,-20 -83,-26 -88,-28" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -20,2 C -22,10 -24,16 -28,18" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -48,3 C -50,10 -52,14 -56,15" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M -8,-3 C -28,-12 -55,-18 -78,-18" stroke="#4a8040" strokeWidth="1.2" fill="none" opacity="0.35"/>
      </g>

      {/* Middle-right leaf */}
      <g transform="translate(151,258)">
        <path
          d="M -2,0 C 5,-8 30,-20 62,-28 C 85,-33 106,-26 106,-14 C 106,-4 85,10 62,14 C 35,18 8,12 -2,0 Z"
          fill="url(#lg4)"
        />
        <path d="M -2,0 C 22,0 65,-2 106,-14" stroke="#1c4420" strokeWidth="1.3" fill="none" opacity="0.6"/>
        <path d="M 20,-4 C 23,-16 27,-24 34,-28" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 46,-7 C 50,-18 54,-25 60,-28" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 72,-9 C 75,-18 79,-23 84,-24" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 20,2 C 22,10 24,15 27,16" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 46,3 C 48,10 50,14 53,15" stroke="#1c4420" strokeWidth="0.8" fill="none" opacity="0.4"/>
        <path d="M 8,-2 C 28,-10 56,-16 80,-15" stroke="#4a8040" strokeWidth="1.2" fill="none" opacity="0.35"/>
      </g>

      {/* ═══════════════════════════════
          UPPER LEAVES (near flowers)
         ═══════════════════════════════ */}
      {/* Upper-left leaf */}
      <g transform="translate(147,158) rotate(-15)">
        <path
          d="M 2,0 C -4,-8 -22,-18 -48,-24 C -68,-28 -84,-22 -84,-12 C -84,-4 -68,6 -48,10 C -26,14 -5,8 2,0 Z"
          fill="url(#lg1)"
        />
        <path d="M 2,0 C -16,0 -50,-4 -84,-12" stroke="#1c4420" strokeWidth="1.1" fill="none" opacity="0.55"/>
        <path d="M -16,-4 C -18,-14 -22,-20 -27,-22" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M -38,-6 C -40,-15 -43,-20 -48,-24" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M -58,-8 C -60,-16 -63,-20 -68,-22" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M -16,2 C -17,8 -20,12 -23,14" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M -40,3 C -41,9 -44,12 -47,13" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
      </g>

      {/* Upper-right leaf */}
      <g transform="translate(149,170) rotate(20)">
        <path
          d="M -2,0 C 4,-8 22,-18 50,-22 C 70,-25 85,-18 85,-8 C 85,0 70,10 50,14 C 28,18 5,10 -2,0 Z"
          fill="url(#lg2)"
        />
        <path d="M -2,0 C 18,0 55,-2 85,-8" stroke="#1c4420" strokeWidth="1.1" fill="none" opacity="0.55"/>
        <path d="M 18,-3 C 20,-12 23,-18 28,-20" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M 38,-5 C 40,-14 43,-19 48,-22" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M 58,-6 C 60,-14 63,-18 68,-20" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M 18,2 C 19,8 20,12 22,13" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
        <path d="M 40,3 C 41,9 43,12 46,13" stroke="#1c4420" strokeWidth="0.7" fill="none" opacity="0.4"/>
      </g>

      {/* Small leaf near top-right flower */}
      <g transform="translate(200,55) rotate(30)">
        <path
          d="M 0,2 C -4,-5 -15,-14 -32,-18 C -45,-20 -55,-14 -55,-7 C -55,-1 -45,6 -32,9 C -18,12 -4,8 0,2 Z"
          fill="url(#lg3)"
        />
        <path d="M 0,2 C -12,1 -35,-2 -55,-7" stroke="#1c4420" strokeWidth="0.9" fill="none" opacity="0.5"/>
        <path d="M -14,-2 C -16,-9 -18,-14 -22,-17" stroke="#1c4420" strokeWidth="0.6" fill="none" opacity="0.4"/>
        <path d="M -32,0 C -33,-8 -36,-12 -40,-15" stroke="#1c4420" strokeWidth="0.6" fill="none" opacity="0.4"/>
      </g>

      {/* Small leaf near top-left flower */}
      <g transform="translate(96,65) rotate(-25)">
        <path
          d="M 0,2 C 4,-6 16,-14 34,-18 C 47,-20 56,-14 56,-7 C 56,-1 47,6 34,9 C 20,12 5,8 0,2 Z"
          fill="url(#lg4)"
        />
        <path d="M 0,2 C 14,1 36,-2 56,-7" stroke="#1c4420" strokeWidth="0.9" fill="none" opacity="0.5"/>
        <path d="M 14,-2 C 16,-9 18,-14 22,-17" stroke="#1c4420" strokeWidth="0.6" fill="none" opacity="0.4"/>
        <path d="M 32,0 C 33,-8 35,-12 40,-15" stroke="#1c4420" strokeWidth="0.6" fill="none" opacity="0.4"/>
      </g>

      {/* ═══════════════════════════════
          BUDS
         ═══════════════════════════════ */}
      {/* Bud top-left (small, mostly green) */}
      <g transform="translate(128,48)">
        <path d="M -4,8 C -7,-2 -6,-16 0,-24 C 6,-16 7,-2 4,8 Z" fill="#4a7a3c"/>
        <path d="M 0,-22 C -5,-16 -6,-4 -4,6 Q0,4 4,6 C 6,-4 5,-16 0,-22 Z" fill="#f5f5ec"/>
        <path d="M 0,-22 C -2,-16 -2,-4 -1,4 Q0,3 1,4 C 2,-4 2,-16 0,-22 Z" fill="white" opacity="0.5"/>
        {/* Small sepals */}
        <path d="M -4,6 C -10,2 -12,-6 -8,-12" stroke="#4a7a3c" strokeWidth="1.5" fill="none"/>
        <path d="M 4,6 C 10,2 12,-6 8,-12" stroke="#4a7a3c" strokeWidth="1.5" fill="none"/>
      </g>

      {/* Bud cluster near top (small buds group) */}
      <g transform="translate(143,66)">
        {/* Green sepal base */}
        <path d="M -3,10 C -8,4 -8,-8 -2,-18 C 2,-10 4,0 2,10 Z" fill="#4a7a3c"/>
        <path d="M -2,-16 C -6,-10 -7,2 -5,8 Q-2,6 2,8 C 4,2 3,-10 -2,-16 Z" fill="#f0f5e8"/>
        <path d="M -2,-16 C -3,-10 -3,0 -2,6 Q-1,5 0,6 C 1,0 1,-10 -2,-16 Z" fill="white" opacity="0.5"/>
        <path d="M -5,8 C -10,4 -12,-4 -8,-12" stroke="#4a7a3c" strokeWidth="1.2" fill="none"/>
        <path d="M 2,8 C 7,4 9,-4 6,-12" stroke="#4a7a3c" strokeWidth="1.2" fill="none"/>
      </g>

      {/* Small bud near right flower */}
      <g transform="translate(216,182)">
        <path d="M -3,8 C -7,2 -7,-8 -1,-16 C 3,-8 4,0 2,8 Z" fill="#4a7a3c"/>
        <path d="M -1,-14 C -5,-8 -5,2 -3,7 Q0,5 2,7 C 4,2 3,-8 -1,-14 Z" fill="#f5f5ec"/>
        <path d="M -3,6 C -8,2 -9,-5 -6,-11" stroke="#4a7a3c" strokeWidth="1.2" fill="none"/>
        <path d="M 2,6 C 7,2 8,-5 5,-11" stroke="#4a7a3c" strokeWidth="1.2" fill="none"/>
      </g>

      {/* White open small bud right */}
      <g transform="translate(238,200)">
        {/* Sepals */}
        <path d="M -5,10 C -10,4 -10,-8 -3,-20 C 1,-10 3,-2 1,10 Z" fill="#5a8a44"/>
        <path d="M 5,10 C 10,4 10,-8 3,-20 C -1,-10 -3,-2 -1,10 Z" fill="#4a7a3c"/>
        {/* Petals */}
        <path d="M 0,-18 C -12,-12 -14,0 -4,8 Q0,10 4,8 C 14,0 12,-12 0,-18 Z" fill="#f8f8f2"/>
        <path d="M 0,-18 C -4,-12 -5,0 -1,6 Q0,7 1,6 C 5,0 4,-12 0,-18 Z" fill="white" opacity="0.6"/>
        {/* Tiny stamen hint */}
        <circle cx="0" cy="2" r="3" fill="#f0c030" opacity="0.7"/>
      </g>

      {/* ═══════════════════════════════
          FLOWER 1 — Back flower (right-top)
          Center: ~(200, 73)
         ═══════════════════════════════ */}
      <g transform="translate(200,73)">
        {/* Back petals (slightly shaded) */}
        {/* Petal 1 - upper left */}
        <path
          d="M 0,6 C -18,4 -38,-12 -36,-38 C -34,-52 -22,-58 -10,-52 C -4,-48 0,-40 0,6 Z"
          fill="url(#pgShade)"
        />
        {/* Petal 2 - upper right */}
        <path
          d="M 0,6 C 18,4 38,-12 36,-38 C 34,-52 22,-58 10,-52 C 4,-48 0,-40 0,6 Z"
          fill="url(#pgShade)"
        />
        {/* Petal 3 - right */}
        <path
          d="M 0,6 C 6,-8 30,-14 52,-2 C 62,6 62,18 52,24 C 40,30 18,22 0,6 Z"
          fill="url(#pgShade)"
        />

        {/* Front petals (white) */}
        {/* Petal 4 - left */}
        <path
          d="M 0,6 C -6,-8 -30,-14 -52,-2 C -62,6 -62,18 -52,24 C -40,30 -18,22 0,6 Z"
          fill="url(#pg1)"
        />
        {/* Petal 5 - lower */}
        <path
          d="M 0,6 C -16,8 -28,28 -18,48 C -10,62 6,64 14,52 C 22,38 16,18 0,6 Z"
          fill="url(#pg1)"
        />
        {/* Petal 6 - lower-right */}
        <path
          d="M 0,6 C 16,8 30,28 22,50 C 16,64 2,66 -6,56 C -16,42 -10,18 0,6 Z"
          fill="url(#pg1)"
        />

        {/* Stamen cluster */}
        <circle cx="0" cy="8" r="13" fill="#e8d060" opacity="0.25"/>
        {/* Individual stamens */}
        {[
          [0,-8],[5,-6],[8,-2],[8,4],[5,8],
          [0,10],[-5,8],[-8,4],[-8,-2],[-5,-6],
          [3,-4],[-3,-4],[3,3],[-3,3]
        ].map(([x,y], i) => (
          <g key={i}>
            <line x1={x*0.4} y1={y*0.4} x2={x} y2={y} stroke="#d4a020" strokeWidth="0.8" opacity="0.7"/>
            <circle cx={x} cy={y} r="1.8" fill="#f0c030"/>
          </g>
        ))}
        <circle cx="0" cy="2" r="5" fill="#e8b820" opacity="0.6"/>
      </g>

      {/* ═══════════════════════════════
          FLOWER 2 — Front main flower (left)
          Center: ~(115, 108)
         ═══════════════════════════════ */}
      <g transform="translate(115,108)">
        {/* Back petals */}
        {/* Petal upper-right */}
        <path
          d="M 0,6 C 18,4 40,-14 38,-42 C 36,-56 24,-62 12,-56 C 4,-50 0,-38 0,6 Z"
          fill="url(#pgShade)"
        />
        {/* Petal upper-left */}
        <path
          d="M 0,6 C -18,4 -40,-14 -38,-42 C -36,-56 -24,-62 -12,-56 C -4,-50 0,-38 0,6 Z"
          fill="url(#pgShade)"
        />
        {/* Petal right-upper */}
        <path
          d="M 0,6 C 8,-10 34,-16 56,-4 C 66,4 66,18 54,24 C 42,30 18,22 0,6 Z"
          fill="url(#pgShade)"
        />

        {/* Front petals */}
        {/* Petal left */}
        <path
          d="M 0,6 C -8,-10 -34,-16 -56,-4 C -66,4 -66,18 -54,24 C -42,30 -18,22 0,6 Z"
          fill="url(#pg1)"
        />
        {/* Petal lower-left */}
        <path
          d="M 0,6 C -18,10 -34,32 -24,54 C -16,68 0,72 10,60 C 20,46 14,22 0,6 Z"
          fill="url(#pg1)"
        />
        {/* Petal lower-right */}
        <path
          d="M 0,6 C 18,10 34,32 24,54 C 16,68 0,72 -10,60 C -20,46 -14,22 0,6 Z"
          fill="url(#pg1)"
        />
        {/* Petal lower */}
        <path
          d="M 0,6 C -8,20 -10,46 2,60 C 10,68 20,66 26,54 C 32,38 20,16 0,6 Z"
          fill="url(#pg2)"
        />

        {/* Green sepal base hints */}
        <path d="M -10,12 C -14,20 -12,30 -6,36" stroke="#5a8a44" strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M 10,12 C 14,20 12,30 6,36" stroke="#5a8a44" strokeWidth="2" fill="none" opacity="0.5"/>

        {/* Stamen cluster */}
        <circle cx="0" cy="8" r="15" fill="#d4a020" opacity="0.15"/>
        {[
          [0,-10],[6,-8],[10,-3],[10,4],[7,9],
          [2,12],[-4,12],[-9,8],[-11,3],[-10,-4],
          [-6,-8],[4,-5],[-4,-5],[5,4],[-5,4],
          [0,4],[3,-2],[-3,-2]
        ].map(([x,y], i) => (
          <g key={i}>
            <line x1={x*0.3} y1={y*0.3} x2={x} y2={y} stroke="#c09010" strokeWidth="0.9" opacity="0.65"/>
            <circle cx={x} cy={y} r="2" fill="#f0c832"/>
            <circle cx={x} cy={y} r="0.8" fill="#e8b020"/>
          </g>
        ))}
        <circle cx="0" cy="2" r="6" fill="#e0c020" opacity="0.5"/>
      </g>

      {/* ═══════════════════════════════
          FLOWER 3 — Right-side flower (smaller)
          Center: ~(237, 205) — but we'll shift it
         ═══════════════════════════════ */}
      <g transform="translate(255,208) scale(0.82)">
        {/* Back petals */}
        <path
          d="M 0,6 C 18,4 40,-14 38,-42 C 36,-56 24,-62 12,-56 C 4,-50 0,-38 0,6 Z"
          fill="url(#pgShade)"
        />
        <path
          d="M 0,6 C -18,4 -40,-14 -38,-42 C -36,-56 -24,-62 -12,-56 C -4,-50 0,-38 0,6 Z"
          fill="url(#pgShade)"
        />
        <path
          d="M 0,6 C 8,-10 34,-16 56,-4 C 66,4 66,18 54,24 C 42,30 18,22 0,6 Z"
          fill="url(#pgShade)"
        />

        {/* Front petals */}
        <path
          d="M 0,6 C -8,-10 -34,-16 -56,-4 C -66,4 -66,18 -54,24 C -42,30 -18,22 0,6 Z"
          fill="url(#pg1)"
        />
        <path
          d="M 0,6 C -18,10 -34,32 -24,54 C -16,68 0,72 10,60 C 20,46 14,22 0,6 Z"
          fill="url(#pg1)"
        />
        <path
          d="M 0,6 C 18,10 34,32 24,54 C 16,68 0,72 -10,60 C -20,46 -14,22 0,6 Z"
          fill="url(#pg1)"
        />

        {/* Stamens */}
        {[
          [0,-9],[6,-7],[9,-2],[9,4],[6,8],
          [1,11],[-5,10],[-9,6],[-10,1],[-8,-5],
          [-4,-8],[3,-4],[4,4],[-4,4],[0,3]
        ].map(([x,y], i) => (
          <g key={i}>
            <line x1={x*0.3} y1={y*0.3} x2={x} y2={y} stroke="#c09010" strokeWidth="0.8" opacity="0.65"/>
            <circle cx={x} cy={y} r="1.8" fill="#f0c832"/>
          </g>
        ))}
        <circle cx="0" cy="2" r="5.5" fill="#e2c020" opacity="0.45"/>
      </g>
    </svg>)}
    export default JasmineSVG