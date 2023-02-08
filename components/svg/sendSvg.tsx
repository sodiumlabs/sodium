import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SendSvg(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 15 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-send"
      style={{
        width: 20,
        height: 20
      }}
      {...props}
    >
      <Path
        d="M12.888.177L.702 6.737C-.306 7.28-.21 8.673.869 9.086l3.348 1.293v2.308c0 1.269 1.734 1.791 2.537.782l1.283-1.616 3.278 1.263a1.509 1.509 0 001.228-.07c.375-.198.632-.548.7-.944l1.74-10.588C15.162.418 13.902-.367 12.888.177zm-7.265 12.51V10.92l1.072.412-1.072 1.354zm6.228-.785l-4.505-1.736 4.107-5.532c.313-.424-.278-.916-.694-.58l-6.196 5.04-3.158-1.22L13.59 1.312l-1.74 10.59z"
        fill="black"
      />
    </Svg>
  )
}

export default SendSvg
