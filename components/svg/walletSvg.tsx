import * as React from "react"
import Svg, { Path } from "react-native-svg"

function WalletSvg(props) {
  return (
    <Svg
      width={17}
      height={15}
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-wallet c-ggfeQr"
      {...props}
    >
      <Path
        d="M14.875 2.679v-.536A2.134 2.134 0 0012.75 0H3.187C1.427 0 0 1.44 0 3.214v8.572C0 13.56 1.427 15 3.188 15h11.687C16.049 15 17 14.04 17 12.857V4.821a2.134 2.134 0 00-2.125-2.142zm.531 10.178a.534.534 0 01-.531.536H3.187c-.878 0-1.593-.721-1.593-1.607V3.214c0-.886.715-1.607 1.593-1.607h9.563c.293 0 .531.24.531.536v1.071H3.72a.533.533 0 00-.531.536c0 .296.237.536.53.536h11.157c.293 0 .531.24.531.535v8.036zM12.75 7.5c-.587 0-1.063.48-1.063 1.071 0 .592.476 1.072 1.063 1.072s1.063-.48 1.063-1.072c0-.591-.476-1.071-1.063-1.071z"
        fill="black"
      />
    </Svg>
  )
}

export default WalletSvg
