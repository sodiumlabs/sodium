import { GalleryWebViewProps } from './types';
import * as React from 'react';

// use iframe to render webview
export function WebView(props: GalleryWebViewProps) {
    const currentApp = props.app;
    const appMessageHandler = props.appMessageHandler;

    const webViewRef = React.useCallback<(w: HTMLIFrameElement) => void>(newWebView => {
        if (newWebView) {
            appMessageHandler.register((message: string) => {
                console.debug("send app message", message);
                if (newWebView.contentWindow) {
                    newWebView.contentWindow.postMessage(message, "*");
                }
            });
        }
    }, [appMessageHandler]);

    const onNativeMessage = (event: MessageEvent) => {
        const newEvent = {
            data: event.data,
            origin: event.origin,
        }
        appMessageHandler.onWebviewMessage(newEvent);
    }

    React.useEffect(() => {
        window.addEventListener("message", onNativeMessage);
        return () => {
            window.removeEventListener("message", onNativeMessage);
        }
    }, [appMessageHandler]);

    return (
        <iframe
            ref={webViewRef}
            style={{
                height: '100%'
            }}
            src={currentApp.uri}
        />
    )
}