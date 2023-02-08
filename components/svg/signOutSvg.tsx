import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SignOutSvg(props) {
  return (
    <Svg
      width={12}
      height={10}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-signout c-fxqjxY"
      {...props}
    >
      <Path
        d="M2.25 0h1.969c.154 0 .28.14.28.313v.625c0 .171-.126.312-.28.312h-1.97c-.62 0-1.124.56-1.124 1.25v5c0 .69.504 1.25 1.125 1.25h1.969c.154 0 .28.14.28.313v.624c0 .172-.126.313-.28.313h-1.97C1.009 10 0 8.88 0 7.5v-5C0 1.12 1.008 0 2.25 0zm5.416.508l-.46.51a.333.333 0 00.005.446l2.651 2.859H4.031c-.155 0-.281.14-.281.312v.73c0 .171.126.312.281.312h5.831l-2.65 2.857a.339.339 0 00-.005.445l.459.51c.11.123.288.123.398 0l3.853-4.27a.338.338 0 000-.443L8.064.506a.264.264 0 00-.398.002z"
        fill="white"
      />
    </Svg>
  )
}

export default SignOutSvg
