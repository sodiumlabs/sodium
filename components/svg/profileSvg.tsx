import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ProfileSvg(props) {
  return (
    <Svg
      width={15}
      height={15}
      viewBox="-2 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-account"
      {...props}
    >
      <Path
        d="M6.25 7.143A3.571 3.571 0 106.25 0a3.571 3.571 0 000 7.142zm2.5.893h-.466a4.862 4.862 0 01-4.068 0H3.75c-2.07 0-3.75 1.68-3.75 3.75v1.16c0 .74.6 1.34 1.34 1.34h9.82c.74 0 1.34-.6 1.34-1.34v-1.16c0-2.07-1.68-3.75-3.75-3.75z"
        fill="black"
      />
    </Svg>
  )
}

export default ProfileSvg
