import { GalleryWebViewProps } from './types';
import { WebView as NativeWebView, WebViewMessageEvent } from 'react-native-webview';
import * as React from 'react';

export function WebView(props: GalleryWebViewProps) {
    const currentApp = props.app;
    const styles = props.styles;
    const appMessageHandler = props.appMessageHandler;

    const webViewRef = React.useCallback<(w: NativeWebView) => void>(newWebView => {
        if (newWebView) {
            appMessageHandler.register((message: string) => {
                // console.debug("send app message", message);
                newWebView.injectJavaScript(`
                (function() {
                    // window.addEventListener("message", (event) => {
                    //     let message = {}
                    //     try {
                    //         message = JSON.parse(event.data)
                    //     } catch (err) {
                    //         // event is not a ProviderMessage JSON object, skip
                    //         return
                    //     }
                    //     alert("sodium message" + " " + JSON.stringify(message))
                    // })
                    const event = new MessageEvent("message", {
                        "data": JSON.stringify(${message}),
                        "origin": window.location.href
                    });
                    dispatchEvent(event);
                })()
                `);
            });
        }
    }, [appMessageHandler]);

    const onNativeMessage = (event: WebViewMessageEvent) => {
        const newEvent = {
            data: event.nativeEvent.data,
            origin: event.nativeEvent.url,
        }
        appMessageHandler.onWebviewMessage(newEvent);
    }

    return (
        <NativeWebView
            ref={webViewRef}
            originWhitelist={['*']}
            style={styles}
            onMessage={onNativeMessage}
            automaticallyAdjustContentInsets={false}
            injectedJavaScriptBeforeContentLoaded='window.__SODIUM__="0.1.1";'
            source={{
                uri: currentApp.uri
            }}
        />
    )
}