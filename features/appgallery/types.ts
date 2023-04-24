// <WebView
// ref={webViewRef}
// originWhitelist={['*']}
// style={styles.webview}
// onMessage={onMessage}
// automaticallyAdjustContentInsets={false}
// injectedJavaScriptBeforeContentLoaded='window.__SODIUM__="0.1.1";'
// source={{
//     uri: currentApp.uri
// }}
// />
import { AppMessageHandler } from "@0xsodium/provider";
import { ViewStyle, StyleProp } from 'react-native';
import { IApp } from "../../lib/define";

export type AppMessageEvent = {
    data: string;
    origin: string;
}

export type GalleryWebViewProps = {
    app: IApp;

    styles: StyleProp<ViewStyle>;

    appMessageHandler: AppMessageHandler;
}