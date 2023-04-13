import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SteamSvg(props: SvgProps) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 60 61"
      fill="none"
      // xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M29.948 0C14.161 0 1.228 12.28 0 27.884l16.107 6.718a8.396 8.396 0 015.261-1.479l7.164-10.475v-.146c0-6.303 5.083-11.433 11.333-11.433 6.248 0 11.332 5.13 11.332 11.433 0 6.302-5.084 11.434-11.332 11.434-.087 0-.172-.002-.258-.004l-10.217 7.35c.007.137.01.273.01.407 0 4.734-3.815 8.584-8.505 8.584-4.117 0-7.562-2.966-8.34-6.891L1.034 38.577C4.6 51.3 16.19 60.63 29.948 60.63 46.546 60.63 60 47.056 60 30.315 60 13.572 46.546 0 29.948 0zM18.832 45.998l-3.69-1.538a6.369 6.369 0 003.288 3.155c3.248 1.366 6.993-.188 8.347-3.467a6.454 6.454 0 00.01-4.928 6.374 6.374 0 00-3.446-3.493 6.315 6.315 0 00-4.707-.071l3.814 1.59c2.396 1.008 3.529 3.783 2.53 6.2-.997 2.416-3.75 3.56-6.146 2.552zm28.584-23.496c0-4.2-3.388-7.62-7.55-7.62-4.165 0-7.554 3.42-7.554 7.62s3.389 7.617 7.553 7.617c4.163 0 7.551-3.418 7.551-7.617zm-13.211-.013c0-3.16 2.54-5.722 5.671-5.722 3.134 0 5.674 2.562 5.674 5.722 0 3.16-2.54 5.721-5.674 5.721-3.13 0-5.672-2.561-5.672-5.721z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SteamSvg