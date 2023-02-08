import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SettingSvg(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-settings c-fxqjxY"
      {...props}
    >
      <Path
        d="M6 5.375h-.125v.875a.623.623 0 01-.625.625h-.5a.623.623 0 01-.625-.625v-.875h-.75a.251.251 0 01-.25-.25v-.25c0-.137.113-.25.25-.25h.75V3.75c0-.347.278-.625.625-.625h.5c.347 0 .625.278.625.625v.875h4.75c.137 0 .25.113.25.25v.25c0 .137-.113.25-.25.25H6zm4 4h-.125v.875a.623.623 0 01-.625.625h-.5a.623.623 0 01-.625-.625v-.875h-4.75a.251.251 0 01-.25-.25v-.25c0-.137.113-.25.25-.25h4.75V7.75c0-.347.278-.625.625-.625h.5c.347 0 .625.278.625.625v.875h.75c.137 0 .25.113.25.25v.25c0 .137-.113.25-.25.25H10zM1.5.125h11c.76 0 1.375.616 1.375 1.375v11c0 .76-.616 1.375-1.375 1.375h-11c-.76 0-1.375-.616-1.375-1.375v-11C.125.74.741.125 1.5.125zm.188 12.5h10.624c.173 0 .313-.14.313-.313V1.688a.313.313 0 00-.313-.313H1.688a.313.313 0 00-.313.313v10.624c0 .173.14.313.313.313z"
        fill="white"
      />
    </Svg>
  )
}

export default SettingSvg