import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function ScanFrameSvg(props: SvgProps) {
  return (
    <Svg
      width={300}
      height={300}
      viewBox="0 0 244 244"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M54.568 2H17C8.716 2 2 8.716 2 17v34.571M189.432 2H227c8.284 0 15 6.716 15 15v34.571M54.568 242H17c-8.284 0-15-6.716-15-15v-46m187.432 61H227c8.284 0 15-6.716 15-15v-46"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default ScanFrameSvg
