import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PhoneSvg(props) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="-2.5 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-device"
      {...props}
    >
      <Path
        d="M8.094 0H1.53C.755 0 .125.63.125 1.406v12.188C.125 14.37.755 15 1.531 15h6.563c.776 0 1.406-.63 1.406-1.406V1.406C9.5.63 8.87 0 8.094 0zM4.813 14.063a.936.936 0 110-1.876.936.936 0 110 1.876zm3.28-3.165a.353.353 0 01-.35.352h-5.86a.353.353 0 01-.352-.352v-9.14c0-.194.158-.352.352-.352h5.86c.193 0 .35.158.35.352v9.14z"
        fill="black"
      />
    </Svg>
  )
}

export default PhoneSvg
