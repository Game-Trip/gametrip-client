import * as React from "react";

const ICON = `M23.3055 0.494019C21.564 2.23552 21.7145 5.39602 23.3485 8.57802L11.115 16.7265C6.44949 13.5875 2.25699 12.4265 0.493988 14.1895L11.1365 24.832L0.493988 38.506L14.168 27.8635L24.8105 38.506C26.5735 36.743 25.391 32.5505 22.252 27.885L30.422 15.6515C33.5825 17.2855 36.743 17.4575 38.506 15.6945L23.3055 0.494019Z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#3CDF87",
  stroke: "none",
};

// eslint-disable-next-line react/prop-types
function Pin({ size = 24 }) {
  return (
    <svg height={size} viewBox="0 0 44 44" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
}

export default React.memo(Pin);
