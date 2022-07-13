import { useState } from "react";
import { Range, getTrackBackground } from "react-range";
import { primary } from "../../../../constants/color";

export default function VolumeRange() {
  const [volume, setVolume] = useState(50);

  return (
    <Range
      values={[volume]}
      step={1}
      min={0}
      max={100}
      onChange={(values) => {
        setVolume(values[0]);
      }}
      renderTrack={({ props, children }) => (
        <div
          onMouseDown={props.onMouseDown}
          onTouchStart={props.onTouchStart}
          style={{
            ...props.style,
            height: "20px",
            display: "flex",
            width: "100%",
          }}
        >
          <div
            ref={props.ref}
            style={{
              height: "3px",
              width: "100%",
              borderRadius: "2px",
              background: getTrackBackground({
                values: [volume],
                colors: [primary, "#ccc"],
                min: 0,
                max: 100,
              }),
              alignSelf: "center",
            }}
          >
            {children}
          </div>
        </div>
      )}
      renderThumb={({ props, isDragged }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "15px",
            width: "15px",
            borderRadius: "50%",
            backgroundColor: "#FFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 2px #AAA",
          }}
        />
      )}
    />
  );
}
