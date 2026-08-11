import type { PlantType, GrowthStage } from '../types';

interface PlantIllustrationProps {
  plantType: PlantType;
  stage: GrowthStage;
  wilted?: boolean;
}

export function PlantIllustration({ plantType, stage, wilted }: PlantIllustrationProps) {
  const opacity = wilted ? 0.55 : 1;
  const wobble = wilted ? 'rotate(-8, 120, 220)' : '';

  return (
    <svg viewBox="0 0 240 280" width="240" height="280" xmlns="http://www.w3.org/2000/svg" style={{ maxWidth: '100%', height: 'auto' }}>
      <g opacity={opacity} transform={wobble}>
        {/* Pot — same for all */}
        <path d="M 78 215 L 87 265 L 153 265 L 162 215 Z" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1.5" />
        <rect x="73" y="205" width="94" height="14" rx="3" fill="#D7CCC8" stroke="#BCAAA4" strokeWidth="1" />
        <ellipse cx="120" cy="210" rx="39" ry="5.5" fill="#8D6E63" opacity="0.8" />

        {/* Render plant-specific illustration */}
        {plantType === 'pothos' && <PothosIllustration stage={stage} />}
        {plantType === 'cactus' && <CactusIllustration stage={stage} />}
        {plantType === 'rose' && <RoseIllustration stage={stage} />}
        {plantType === 'sunflower' && <SunflowerIllustration stage={stage} />}
        {plantType === 'monstera' && <MonsteraIllustration stage={stage} />}
        {plantType === 'succulent' && <SucculentIllustration stage={stage} />}
        {plantType === 'lavender' && <LavenderIllustration stage={stage} />}
      </g>
    </svg>
  );
}

/* ===== 绿萝 — trailing vine with heart leaves ===== */
function PothosIllustration({ stage }: { stage: GrowthStage }) {
  const scale = stage === 'seedling' ? 0.5 : stage === 'mature' ? 0.75 : 1;
  const hasFlowers = stage === 'blooming';
  return (
    <g transform={`translate(120,205) scale(${scale}) translate(-120,-205)`}>
      {/* Main vines */}
      <path d="M120 205 Q118 180 120 150 Q122 120 115 90" fill="none" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 205 Q125 175 145 145 Q165 115 170 95" fill="none" stroke="#43A047" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M120 205 Q115 170 90 148 Q65 128 55 105" fill="none" stroke="#388E3C" strokeWidth="2.5" strokeLinecap="round" />
      {/* Heart-shaped leaves along vines */}
      <g fill="#66BB6A">
        <path d="M108 175 Q105 168 110 165 Q115 162 115 170 Q115 163 120 165 Q124 168 122 175 Q115 182 108 175Z" transform="rotate(-15,115,173)" />
        <path d="M115 148 Q112 141 117 138 Q122 135 122 143 Q122 136 127 138 Q131 141 129 148 Q122 155 115 148Z" transform="rotate(10,122,146)" />
        <path d="M135 140 Q132 133 137 130 Q142 127 142 135 Q142 128 147 130 Q151 133 149 140 Q142 147 135 140Z" transform="rotate(-20,142,138)" />
        <path d="M115 115 Q112 108 117 105 Q122 102 122 110 Q122 103 127 105 Q131 108 129 115 Q122 122 115 115Z" transform="rotate(5,122,113)" />
        <path d="M95 148 Q92 141 97 138 Q102 135 102 143 Q102 136 107 138 Q111 141 109 148 Q102 155 95 148Z" transform="rotate(-30,102,146)" />
        <path d="M160 125 Q157 118 162 115 Q167 112 167 120 Q167 113 172 115 Q176 118 174 125 Q167 132 160 125Z" transform="rotate(15,167,123)" />
        <path d="M100 130 Q97 123 102 120 Q107 117 107 125 Q107 118 112 120 Q116 123 114 130 Q107 137 100 130Z" transform="rotate(-10,107,128)" />
        <path d="M70 128 Q67 121 72 118 Q77 115 77 123 Q77 116 82 118 Q86 121 84 128 Q77 135 70 128Z" transform="rotate(-25,77,126)" />
      </g>
      {/* Blooming — small white flowers */}
      {hasFlowers && (
        <>
          <g transform="translate(112,85)"><circle r="6" fill="#FFF9C4" opacity="0.9" /><circle cx="0" cy="-4" r="2.5" fill="#FFF176" /><circle cx="3.5" cy="2" r="2.5" fill="#FFF176" /><circle cx="-3.5" cy="2" r="2.5" fill="#FFF176" /></g>
          <g transform="translate(175,90)"><circle r="5" fill="#FFF9C4" opacity="0.85" /><circle cx="0" cy="-3" r="2" fill="#FFF176" /><circle cx="3" cy="1.5" r="2" fill="#FFF176" /><circle cx="-3" cy="1.5" r="2" fill="#FFF176" /></g>
          <g transform="translate(50,100)"><circle r="4.5" fill="#FFF9C4" opacity="0.8" /><circle cx="0" cy="-3" r="2" fill="#FFF176" /><circle cx="3" cy="1.5" r="2" fill="#FFF176" /><circle cx="-3" cy="1.5" r="2" fill="#FFF176" /></g>
        </>
      )}
    </g>
  );
}

/* ===== 仙人掌 — columnar with arms ===== */
function CactusIllustration({ stage }: { stage: GrowthStage }) {
  const h = stage === 'seedling' ? 45 : stage === 'mature' ? 70 : 85;
  const hasArms = stage !== 'seedling';
  const hasFlower = stage === 'blooming';
  return (
    <g>
      {/* Main body */}
      <rect x="107" y={210 - h} width="26" height={h} rx="13" fill="#66BB6A" stroke="#43A047" strokeWidth="1.5" />
      {/* Ridges */}
      <line x1="115" y1={210 - h + 5} x2="115" y2="205" stroke="#81C784" strokeWidth="0.8" />
      <line x1="125" y1={210 - h + 5} x2="125" y2="205" stroke="#81C784" strokeWidth="0.8" />
      {/* Arms */}
      {hasArms && (
        <>
          <path d="M107 175 Q90 175 90 160 L90 140" fill="none" stroke="#66BB6A" strokeWidth="16" strokeLinecap="round" />
          <path d="M90 140 Q90 125 98 125" fill="none" stroke="#66BB6A" strokeWidth="14" strokeLinecap="round" />
          <path d="M133 180 Q150 180 150 162 L150 145" fill="none" stroke="#66BB6A" strokeWidth="14" strokeLinecap="round" />
          <path d="M150 145 Q150 132 142 132" fill="none" stroke="#66BB6A" strokeWidth="12" strokeLinecap="round" />
        </>
      )}
      {/* Spines */}
      <g stroke="#C8E6C9" strokeWidth="1.2" strokeLinecap="round">
        <line x1="107" y1={195} x2="98" y2="193" />
        <line x1="133" y1={185} x2="142" y2="183" />
        <line x1="107" y1={170} x2="98" y2="168" />
        <line x1="133" y1={162} x2="142" y2="160" />
      </g>
      {/* Flower on top */}
      {hasFlower && (
        <g transform="translate(120, 210 - h - 4)">
          <circle r="10" fill="#FF8A80" />
          <circle cx="0" cy="-6" r="3.5" fill="#FFCDD2" />
          <circle cx="5" cy="4" r="3.5" fill="#FFCDD2" />
          <circle cx="-5" cy="4" r="3.5" fill="#FFCDD2" />
          <circle cx="0" cy="6" r="3.5" fill="#FFCDD2" />
          <circle cx="0" cy="0" r="3" fill="#FFAB40" />
        </g>
      )}
    </g>
  );
}

/* ===== 玫瑰 — bushy with iconic blooms ===== */
function RoseIllustration({ stage }: { stage: GrowthStage }) {
  const h = stage === 'seedling' ? 30 : stage === 'mature' ? 50 : 60;
  const hasFlowers = stage === 'blooming';
  return (
    <g>
      {/* Main stem */}
      <path d={`M120 205 L120 ${205 - h}`} stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" />
      {/* Thorns */}
      <g stroke="#795548" strokeWidth="1.5" strokeLinecap="round">
        <line x1="120" y1="190" x2="113" y2="185" />
        <line x1="120" y1="175" x2="127" y2="170" />
        {stage !== 'seedling' && <line x1="120" y1="165" x2="112" y2="160" />}
      </g>
      {/* Leaves */}
      <g fill="#43A047">
        {stage === 'seedling' && (
          <>
            <ellipse cx="108" cy="188" rx="12" ry="6" transform="rotate(-25,108,188)" />
            <ellipse cx="132" cy="182" rx="11" ry="5.5" transform="rotate(25,132,182)" />
            <ellipse cx="118" cy="176" rx="9" ry="5" transform="rotate(5,118,176)" />
          </>
        )}
        {(stage === 'mature' || stage === 'blooming') && (
          <>
            <ellipse cx="105" cy="192" rx="14" ry="7" transform="rotate(-30,105,192)" />
            <ellipse cx="135" cy="186" rx="13" ry="6.5" transform="rotate(30,135,186)" />
            <ellipse cx="108" cy="175" rx="13" ry="6.5" transform="rotate(-20,108,175)" />
            <ellipse cx="132" cy="168" rx="12" ry="6" transform="rotate(22,132,168)" />
            <ellipse cx="112" cy="160" rx="11" ry="5.5" transform="rotate(-15,112,160)" />
            <ellipse cx="128" cy="155" rx="10" ry="5" transform="rotate(18,128,155)" />
            <ellipse cx="118" cy="150" rx="10" ry="5" transform="rotate(0,118,150)" />
          </>
        )}
      </g>
      {/* Rose flowers */}
      {hasFlowers && (
        <>
          <g transform="translate(120,205 - h - 8)">
            {/* Layered rose petals */}
            <circle r="14" fill="#F06292" />
            <circle cx="0" cy="-8" r="5" fill="#F48FB1" />
            <circle cx="7" cy="5" r="5" fill="#F48FB1" />
            <circle cx="-7" cy="5" r="5" fill="#F48FB1" />
            <circle cx="0" cy="7" r="5" fill="#F48FB1" />
            <circle cx="0" cy="-3" r="4" fill="#E91E63" />
            <circle cx="3" cy="2" r="4" fill="#E91E63" />
            <circle cx="-3" cy="2" r="4" fill="#E91E63" />
            {/* Center swirl */}
            <circle cx="0" cy="0" r="2.5" fill="#FFAB40" />
          </g>
          {/* Small bud */}
          <g transform="translate(140,175)">
            <circle r="7" fill="#F48FB1" />
            <circle cx="0" cy="-3" r="3.5" fill="#F06292" />
            <circle cx="0" cy="0" r="2" fill="#FFAB40" />
          </g>
        </>
      )}
    </g>
  );
}

/* ===== 向日葵 — tall stalk with big round flower ===== */
function SunflowerIllustration({ stage }: { stage: GrowthStage }) {
  const h = stage === 'seedling' ? 40 : stage === 'mature' ? 70 : 90;
  const hasFlower = stage === 'blooming';
  const flowerSize = stage === 'seedling' ? 16 : hasFlower ? 28 : 20;
  const leafCount = stage === 'seedling' ? 2 : 4;
  return (
    <g>
      {/* Stem */}
      <path d={`M120 205 L120 ${205 - h}`} stroke="#558B2F" strokeWidth="4" strokeLinecap="round" />
      {/* Leaves — pairs along stem */}
      <g fill="#7CB342">
        {Array.from({ length: leafCount }, (_, i) => {
          const y = 200 - (i * 18);
          const side = i % 2 === 0 ? -1 : 1;
          return (
            <ellipse
              key={i}
              cx={120 + side * 18}
              cy={y}
              rx={16}
              ry={6}
              transform={`rotate(${side * 40},${120 + side * 18},${y})`}
            />
          );
        })}
      </g>
      {/* Flower head */}
      <g transform={`translate(120, ${205 - h - flowerSize / 2 - 2})`}>
        {/* Petals */}
        <g fill="#FFEE58">
          {Array.from({ length: 14 }, (_, i) => {
            const angle = (i / 14) * 360 - 90;
            const rad = (angle * Math.PI) / 180;
            return (
              <ellipse
                key={i}
                cx={Math.cos(rad) * flowerSize * 0.6}
                cy={Math.sin(rad) * flowerSize * 0.6}
                rx={4}
                ry={flowerSize * 0.45}
                transform={`rotate(${angle + 90},${Math.cos(rad) * flowerSize * 0.6},${Math.sin(rad) * flowerSize * 0.6})`}
              />
            );
          })}
        </g>
        {/* Center disk */}
        <circle r={flowerSize * 0.4} fill="#8D6E63" />
        <circle r={flowerSize * 0.25} fill="#6D4C41" />
        {/* Seed pattern dots */}
        {hasFlower && (
          <g fill="#5D4037">
            {Array.from({ length: 8 }, (_, i) => {
              const angle = (i / 8) * 360;
              const rad = (angle * Math.PI) / 180;
              return <circle key={i} cx={Math.cos(rad) * 4} cy={Math.sin(rad) * 4} r="1" />;
            })}
          </g>
        )}
      </g>
    </g>
  );
}

/* ===== 龟背竹 — large split leaves ===== */
function MonsteraIllustration({ stage }: { stage: GrowthStage }) {
  const scale = stage === 'seedling' ? 0.5 : stage === 'mature' ? 0.75 : 1;
  const hasFlowers = stage === 'blooming';
  return (
    <g transform={`translate(120,205) scale(${scale}) translate(-120,-205)`}>
      {/* Stems */}
      <path d="M120 205 Q118 185 110 155" fill="none" stroke="#388E3C" strokeWidth="4" strokeLinecap="round" />
      <path d="M120 205 Q125 180 145 150" fill="none" stroke="#2E7D32" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M120 205 Q110 175 80 160" fill="none" stroke="#43A047" strokeWidth="3.5" strokeLinecap="round" />
      {/* Large split leaves (heart-shaped with cutouts) */}
      <g fill="#4CAF50">
        {/* Top leaf */}
        <g transform="translate(110,155)">
          <path d="M0 0 Q-20 -25 -35 -20 Q-40 -10 -30 0 Q-25 10 -10 12 Q0 15 10 12 Q25 10 30 0 Q40 -10 35 -20 Q20 -25 0 0Z" />
          {/* Splits */}
          <rect x="-38" y="-18" width="30" height="4" rx="2" fill="#F5F7FA" transform="rotate(-15,-23,-16)" />
          <rect x="8" y="-18" width="28" height="4" rx="2" fill="#F5F7FA" transform="rotate(15,22,-16)" />
          <rect x="-25" y="-8" width="22" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(-5,-14,-6)" />
          <rect x="3" y="-8" width="20" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(5,13,-6)" />
        </g>
        {/* Right leaf */}
        <g transform="translate(145,150)">
          <path d="M0 0 Q-15 -20 -28 -16 Q-35 -8 -25 3 Q-20 12 -8 14 Q0 16 8 14 Q20 10 25 2 Q32 -6 26 -14 Q12 -20 0 0Z" />
          <rect x="-30" y="-14" width="22" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(-12,-19,-12)" />
          <rect x="5" y="-14" width="22" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(12,16,-12)" />
        </g>
        {/* Left leaf */}
        <g transform="translate(80,160)">
          <path d="M0 0 Q-18 -18 -30 -14 Q-38 -6 -28 4 Q-22 14 -8 15 Q0 16 10 14 Q22 8 26 0 Q34 -8 28 -16 Q14 -20 0 0Z" />
          <rect x="-33" y="-12" width="22" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(-10,-22,-10)" />
          <rect x="8" y="-12" width="22" height="3.5" rx="2" fill="#F5F7FA" transform="rotate(10,19,-10)" />
        </g>
      </g>
      {/* Small bloom (white spathe) */}
      {hasFlowers && (
        <g transform="translate(110,105)">
          <ellipse cx="0" cy="-10" rx="8" ry="14" fill="#FFFDE7" opacity="0.9" />
          <rect x="-1.5" y="-20" width="3" height="20" rx="1.5" fill="#FFF9C4" />
        </g>
      )}
    </g>
  );
}

/* ===== 多肉 — rosette of plump leaves ===== */
function SucculentIllustration({ stage }: { stage: GrowthStage }) {
  const size = stage === 'seedling' ? 0.5 : stage === 'mature' ? 0.75 : 1;
  const hasFlowers = stage === 'blooming';
  return (
    <g transform={`translate(120,195) scale(${size}) translate(0,0)`}>
      {/* Rosette layers — center leaves */}
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#AED581" transform="rotate(0)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#C5E1A5" transform="rotate(45)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#AED581" transform="rotate(90)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#C5E1A5" transform="rotate(135)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#AED581" transform="rotate(180)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#C5E1A5" transform="rotate(225)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#AED581" transform="rotate(270)" />
      <ellipse cx="0" cy="-8" rx="9" ry="20" fill="#C5E1A5" transform="rotate(315)" />
      {/* Outer ring — larger */}
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#9CCC65" transform="rotate(22)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#AED581" transform="rotate(67)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#9CCC65" transform="rotate(112)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#AED581" transform="rotate(157)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#9CCC65" transform="rotate(202)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#AED581" transform="rotate(247)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#9CCC65" transform="rotate(292)" />
      <ellipse cx="0" cy="-6" rx="14" ry="28" fill="#AED581" transform="rotate(337)" />
      {/* Center rosette */}
      <circle cx="0" cy="0" r="6" fill="#EFEBE9" />
      <circle cx="0" cy="0" r="3.5" fill="#BCAAA4" />
      {/* Subtle pink tips on outer leaves */}
      <g fill="#F48FB1" opacity="0.5">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * 360 + 22;
          const rad = (angle * Math.PI) / 180;
          return <circle key={i} cx={Math.cos(rad) * 14} cy={Math.sin(rad) * 14 - 6} r="3" />;
        })}
      </g>
      {/* Bloom stalk */}
      {hasFlowers && (
        <>
          <path d="M0 0 Q3 -30 5 -60" fill="none" stroke="#9CCC65" strokeWidth="2.5" strokeLinecap="round" />
          <g transform="translate(5,-62)">
            <circle r="6" fill="#F48FB1" />
            <circle cx="0" cy="-4" r="2.5" fill="#FCE4EC" />
            <circle cx="3.5" cy="2" r="2.5" fill="#FCE4EC" />
            <circle cx="-3.5" cy="2" r="2.5" fill="#FCE4EC" />
          </g>
        </>
      )}
    </g>
  );
}

/* ===== 薰衣草 — multiple thin stems with purple spikes ===== */
function LavenderIllustration({ stage }: { stage: GrowthStage }) {
  const stemCount = stage === 'seedling' ? 2 : stage === 'mature' ? 4 : 6;
  return (
    <g>
      {/* Multiple stems fanning out from base */}
      {Array.from({ length: stemCount }, (_, i) => {
        const spread = stemCount > 1 ? (i / (stemCount - 1) - 0.5) * 50 : 0;
        const baseX = 120 + spread * 0.3;
        const topX = 120 + spread;
        const h = 55 + Math.abs(spread) * 0.3;
        return (
          <g key={i}>
            {/* Stem */}
            <path
              d={`M${baseX} 205 Q${(baseX + topX) / 2} ${205 - h * 0.5} ${topX} ${205 - h}`}
              fill="none"
              stroke="#7CB342"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Leaves along stem */}
            <ellipse cx={baseX - 8} cy="193" rx="10" ry="2.5" fill="#9CCC65" transform={`rotate(-30,${baseX - 8},193)`} />
            <ellipse cx={baseX + 8} cy="185" rx="9" ry="2.5" fill="#9CCC65" transform={`rotate(30,${baseX + 8},185)`} />
            {/* Purple flower spike at top */}
            <g transform={`translate(${topX}, ${205 - h})`}>
              {/* Spike body */}
              <ellipse cx="0" cy="-10" rx="5" ry="16" fill="#CE93D8" />
              {/* Individual florets */}
              <circle cx="0" cy="-22" r="4.5" fill="#BA68C8" />
              <circle cx="3" cy="-18" r="4" fill="#CE93D8" />
              <circle cx="-3" cy="-15" r="4" fill="#BA68C8" />
              <circle cx="2" cy="-11" r="4" fill="#CE93D8" />
              <circle cx="-2" cy="-7" r="3.5" fill="#BA68C8" />
              <circle cx="1" cy="-3" r="3" fill="#CE93D8" />
              {/* Top floret cluster */}
              <circle cx="0" cy="-24" r="3" fill="#AB47BC" />
              <circle cx="-2" cy="-22" r="2.5" fill="#CE93D8" />
              <circle cx="2" cy="-20" r="2.5" fill="#BA68C8" />
            </g>
          </g>
        );
      })}
    </g>
  );
}

export function SmallPlantIcon({ plantType, size = 40 }: { plantType: PlantType; size?: number }) {
  const emojis: Record<PlantType, string> = {
    pothos: '🌿', cactus: '🌵', rose: '🌹', sunflower: '🌻',
    monstera: '🪴', succulent: '🪷', lavender: '💜',
  };
  return (
    <span style={{ fontSize: size, lineHeight: 1 }} role="img" aria-label={plantType}>
      {emojis[plantType] || '🌱'}
    </span>
  );
}
