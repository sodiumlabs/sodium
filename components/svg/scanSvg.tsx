import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ScanSvg(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-scan"
      style={{
        width: 20,
        height: 20
      }}
      {...props}
    >
      <Path
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 11L16 11"
      />
      <Path
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 7L11 15"
      />
      <Path
        d="M6 1H4a3 3 0 00-3 3v2m15-5h2a3 3 0 013 3v2M6 21H4a3 3 0 01-3-3v-2m15 5h2a3 3 0 003-3v-2"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ScanSvg
