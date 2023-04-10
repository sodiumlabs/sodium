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

export default function AuthCallbackScreen() {
    const dimension = useDimensionSize();
    const [result, setResult] = React.useState<WebBrowser.WebBrowserCompleteAuthSessionResult>();

    React.useEffect(() => {
        const result = WebBrowser.maybeCompleteAuthSession();
        setResult(result);
    }, []);

    const retry = () => {
        window.close();
    }

    const state = React.useMemo(() => {
        if (!result) {
            return "loading"
        } else if (result.type == "failed") {
            return "auth failed " + result.message
        } else {
            return "auth success"
        }
    }, [result])

    return (
        <ScrollView style={{ width: '100%', height: '100%', paddingHorizontal: 15 }}>
            <MVStack stretchW style={{ alignItems: 'center' }}>
                <MVStack stretchW stretchH style={[styles.container, { minHeight: dimension[1] }]}  >
                    <MImage source={IconLogo} w={30} h={30} style={{ marginBottom: 10 }} />
                    <ScreenTitle title={state} />
                    <MButton stretchW style={{ marginTop: 10, height: 30 }} onPress={retry} >
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