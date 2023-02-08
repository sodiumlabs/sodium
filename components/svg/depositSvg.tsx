
import * as React from "react"
import Svg, { Path } from "react-native-svg"

function DepositSvg(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-swap"
      style={{
        width: 20,
        height: 20
      }}
      {...props}
    >
      <Path
        d="M23 21H8a4 4 0 01-4-4v-2"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.3 24.2l3.5-3.5-3.5-3.5M4.8 7h15a4 4 0 014 4v1"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 3.4L4 6.9l3.5 3.5"
        stroke="black"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default DepositSvg
