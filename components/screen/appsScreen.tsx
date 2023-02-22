import { ScrollView, StyleSheet } from "react-native";
import { fixWidth, IApp } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import MImage from "../baseUI/mImage";
import MVStack from '../baseUI/mVStack';
import * as React from 'react';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { getApps } from "../../lib/data/apps";
import { useCurrentChainId } from "../../lib/network";
import { Button, Icon, Layout, Spinner } from '@ui-kitten/components';
import { showUpdateWebViewModal } from "../../lib/data";
import { useWalletHandler } from "../../lib/provider";
import { AppMessageHandler } from "@0xsodium/provider";

export function AppsScreen() {
    const dimension = useDimensionSize();
    const [apps, setApps] = React.useState<IApp[]>([]);
    const currentChainId = useCurrentChainId();
    const [currentApp, setCurrentApp] = React.useState<IApp>(null);
    const walletHandler = useWalletHandler();
    const appMessageHandler = React.useMemo(() => new AppMessageHandler(walletHandler), [walletHandler]);
    const webViewRef = React.useCallback<(w: WebView) => void>(newWebView => {
        if (newWebView) {
            appMessageHandler.register((message: string) => {
                console.debug("send app message", message);
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
    }, [walletHandler, appMessageHandler]);


    // clear
    React.useEffect(() => {
        return () => {
            console.debug("clear up")
        }
    }, [
        1
    ]);

    React.useEffect(() => {
        getApps()
            .then(apps => apps.filter(app => app.supportChainIds.includes(currentChainId)))
            .then(setApps);
    }, [currentChainId]);

    const openApp = (app: IApp) => {
        console.debug("open webview", app.uri);
        setCurrentApp(app);
    }

    const webViewDom = React.useMemo(() => {
        if (!currentApp) {
            return (
                <></>
            )
        }
        const onMessage = (event: WebViewMessageEvent) => {
            const newEvent = {
                data: event.nativeEvent.data,
                origin: event.nativeEvent.url,
            }
            appMessageHandler.onWebviewMessage(newEvent);
        }
        return (
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                style={styles.webview}
                onMessage={onMessage}
                injectedJavaScriptBeforeContentLoaded='window.__SODIUM__="0.1.1";'
                source={{
                    uri: currentApp.uri
                }}
            />
        )
    }, [currentApp])

    const appsDom = React.useMemo(() => {
        return apps.map((app, key) => {
            const icon = (props) => (<MImage source={{
                uri: app.icon
            }} w={30} h={30} style={{ marginBottom: 10 }} />)
            return (
                <Button onPress={() => openApp(app)} key={key} style={styles.button} appearance='ghost' status='danger' accessoryLeft={icon} />
            )
        })
    }, [apps])

    return (
        <BaseScreen hasNavigationBar={true} hasFloatingBar={false}>
            <ScrollView style={{ width: '100%', height: '100%', flex: 1 }}>
                <MVStack stretchH stretchW style={{ flex: 1 }}>
                    <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
                        {appsDom}
                        {webViewDom}
                    </MVStack>
                </MVStack>
            </ScrollView>
        </BaseScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
    },
    webview: {
        flex: 1
    }
});