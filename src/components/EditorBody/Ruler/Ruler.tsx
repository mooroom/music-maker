import { editor_ruler_text } from "../../../constants/color";
import * as S from "./styles";

const GRADUATIONS = Array.from({ length: 100 }, (_, i) => i * 80);

export default function Ruler() {
  return (
    <S.RulerContainer>
      <S.RulerWrapper>
        <S.RulerGraduation>
          {GRADUATIONS.map((v, i) => (
            <span key={i} style={{ left: `${v}px` }}>
              {i + 1}
            </span>
          ))}
        </S.RulerGraduation>
        <S.RulerCursorContainer>
          <S.PlayHead>
            <svg>
              <circle cx="50%" cy="50%" r="50%" />
            </svg>
          </S.PlayHead>
        </S.RulerCursorContainer>
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
              <rect
                x={0}
                y={0}
                width={0.5}
                height={3000}
                fill={editor_ruler_text}
              />
              <rect
                x={20}
                y={30}
                width={0.5}
                height={3000}
                fill={editor_ruler_text}
              />
              <rect
                x={40}
                y={30}
                width={0.5}
                height={3000}
                fill={editor_ruler_text}
              />
              <rect
                x={60}
                y={30}
                width={0.5}
                height={3000}
                fill={editor_ruler_text}
              />
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
