import * as S from "./styles";

const GRADUATIONS = Array.from({ length: 100 }, (_, i) => i * 80);

export default function Ruler() {
  return (
    <S.RulerContainer>
      <S.RulerWrapper>
        <S.RulerGraduation>
          {GRADUATIONS.map((v, i) => (
            <span style={{ left: `${v}px` }}>{i + 1}</span>
          ))}
        </S.RulerGraduation>
        <S.RulerGrid>
          <defs>
            <pattern
              id="grid-pattern"
              x={0}
              y={0}
              width={80}
              height={40}
              patternUnits="userSpaceOnUse"
            >
              <rect x={0} y={0} width={0.5} height={3000} fill="white" />
              <rect x={20} y={30} width={0.5} height={3000} fill="white" />
              <rect x={40} y={30} width={0.5} height={3000} fill="white" />
              <rect x={60} y={30} width={0.5} height={3000} fill="white" />
            </pattern>
          </defs>
          <rect
            fill="url(#grid-pattern)"
            x={0}
            y={0}
            width={249600}
            height={40}
          />
        </S.RulerGrid>
      </S.RulerWrapper>
    </S.RulerContainer>
  );
}
