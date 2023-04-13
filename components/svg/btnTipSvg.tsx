import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function BtnTipSvg(props: SvgProps) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.542 6.495v1.01l-8.75 5.052-.875-.505V1.948l.875-.505 8.75 5.052z"
        fill="#fff"
      />
    </Svg>
  )
}

export default BtnTipSvg
