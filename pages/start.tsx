import { Button, ScrollView, StyleSheet } from "react-native";
import { fixWidth } from "../lib/define";
import { useDimensionSize } from "../lib/hook/dimension";
import { IconLogo } from "../lib/imageDefine";
import { eColor } from '../components/../lib/globalStyles';
import MImage from "../components/baseUI/mImage";
import MVStack from '../components/baseUI/mVStack';
import { ScreenTitle } from "../components/baseUI/screenTitle";
import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import MButton from '../components/baseUI/mButton';
import { MButtonText } from '../components/baseUI/mButtonText';


// 兼容nextjs的 expo session auth

// 为了兼容twitter的oauth2，
// 需要在nextjs的页面中打开一个新的窗口，
// 然后在新的窗口中进行oauth2的流程，然后在新的窗口中调用window.close()关闭窗口
const channel = "AuthPopupChannel";
export default function App() {
    const dimension = useDimensionSize();

    React.useEffect(() => {
        const url = new URL(window.location.href);
        const authUrl = decodeURIComponent(url.searchParams.get("authUrl"));

        if (authUrl.includes("twitter")) {
            localStorage.setItem(channel, "1")
            window.open(authUrl, 'twitter auth');
            setInterval(() => {
                if (!localStorage.getItem(channel)) {
                    window.parent.focus();
                    window.opener.focus();
                    // 
                    // window.close();
                }
            }, 500);
        } else {
            window.location.href = authUrl;
        }
    }, [])

    const retry = () => {
        window.close();
    }

    return (
        <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
            <MVStack stretchW style={{ alignItems: 'center' }}>
                <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
                    <MImage source={IconLogo} w={30} h={30} style={{ marginBottom: 10 }} />
                    <MButton stretchW style={{ marginTop: 10 }} onPress={retry} >
                        <MButtonText title={"Retry"} />
                    </MButton>
                </MVStack>
            </MVStack>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'black',
        paddingBottom: 100,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: fixWidth
    }
});