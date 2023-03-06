import * as WebBrowser from 'expo-web-browser'
import { Linking } from 'react-native'
import { logger } from './logger'

const ALLOWED_EXTERNAL_URI_SCHEMES = ['http://', 'https://']

/**
 * Opens allowed URIs. if isSafeUri is set to true then this will open http:// and https:// as well as some deeplinks.
 * Only set this flag to true if you have formed the URL yourself in our own app code. For any URLs from an external source
 * isSafeUri must be false and it will only open http:// and https:// URI schemes.
 *
 * @param openExternalBrowser whether to leave the app and open in system browser. default is false, opens in-app browser window
 * @param isSafeUri whether to bypass ALLOWED_EXTERNAL_URI_SCHEMES check
 * @param controlscolor When opening in an in-app browser, determines the controls color
 **/
export async function openUri(
  uri: string,
  openExternalBrowser = false,
  isSafeUri = false,
): Promise<void> {
  const trimmedURI = uri.trim()
  if (!isSafeUri && !ALLOWED_EXTERNAL_URI_SCHEMES.some((scheme) => trimmedURI.startsWith(scheme))) {
    // TODO: [MOB-3925] show a visual warning that the link cannot be opened.
    logger.error('linking', 'openUri', `potentially unsafe URI scheme provided ${uri}`)
    return
  }

  const supported = await Linking.canOpenURL(uri)
  if (!supported) {
    logger.warn('linking', 'openUri', `Cannot open URI: ${uri}`)
    return
  }

  try {
    if (openExternalBrowser) {
      await Linking.openURL(uri)
    } else {
      await WebBrowser.openBrowserAsync(uri, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
      })
    }
  } catch (error) {
    logger.error('linking', 'openUri', `${error}`)
  }
}

export async function openMoonpayHelpLink(): Promise<void> {
  return openUri('https://support.moonpay.com/')
}

export function openSettings(): void {
  Linking.openSettings()
}

export enum ExplorerDataType {
  TRANSACTION = 'transaction',
  TOKEN = 'token',
  ADDRESS = 'address',
  BLOCK = 'block',
}

export function getTwitterLink(twitterName: string): string {
  return `https://twitter.com/${twitterName}`
}
