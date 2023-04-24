import { StyleSheet } from "react-native";
import { IApp } from "../../lib/define";
import { useDimensionSize } from "../../lib/hook/dimension";
import { BaseScreen } from "../base/baseScreen";
import MImage from "../baseUI/mImage";
import * as React from 'react';
import { getApps, setOpenedApp } from "../../lib/data/apps";
import { useCurrentChainId } from "../../lib/network";
import { Button } from '@ui-kitten/components';
import { useWalletHandler } from "../../lib/provider";
import { AppMessageHandler } from "@0xsodium/provider";
import { LocalStorage } from '@0xsodium/provider';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from 'react-native';
import { WebView } from '../../features/appgallery/gallerywebview';

LocalStorage.use(AsyncStorage);

export function AppsScreen() {
    const dimension = useDimensionSize();
    const [apps, setApps] = React.useState<IApp[]>([]);
    const currentChainId = useCurrentChainId();
    const [currentApp, setCurrentApp] = React.useState<IApp>(null);
    const walletHandler = useWalletHandler();
    const appMessageHandler = React.useMemo(() => new AppMessageHandler(walletHandler), [walletHandler]);

    React.useEffect(() => {
        getApps()
            .then(apps => apps.filter(app => app.supportChainIds.includes(currentChainId)))
            .then(setApps);
    }, [currentChainId]);

    React.useEffect(() => {
        return () => {
            console.debug("unmount apps screen");
        }
    })

    const openApp = (app: IApp) => {
        setOpenedApp(app);
        setCurrentApp(app);
    }

    const webViewDom = React.useMemo(() => {
        if (!currentApp) {
            return (
                <></>
            )
        }
        return (
            <WebView
                styles={styles.webview}
                app={currentApp}
                appMessageHandler={appMessageHandler}
            />
        )
    }, [currentApp])

    const appsDom = React.useMemo(() => {
        if (currentApp) {
            return (
                <></>
            )
        }

        return apps.map((app, key) => {
            const icon = (props) => (<MImage uri={app.icon} w={30} h={30} style={{ marginBottom: 10 }} />)
            return (
                <Button onPress={() => openApp(app)} key={key} style={styles.button} appearance='ghost' status='danger' accessoryLeft={icon} />
            )
        })
    }, [apps, currentApp])

    return (
        <BaseScreen hasNavigationBar={true} hasFloatingBar={false}>
            {/* <ScrollView style={{ width: '100%' }}> */}
            <View style={{ height: "90%", marginTop: 100 }}>
                {appsDom}

                {webViewDom}
            </View>
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