import { useEffect } from 'react';

// 兼容nextjs的 expo session auth

export default function App() {
    useEffect(() => {
        const url = new URL(window.location.href);
        const authUrl = decodeURIComponent(url.searchParams.get("authUrl"));
        console.debug(authUrl, "authUrl")
        // const result = WebBrowser.maybeCompleteAuthSession({
        //     skipRedirectCheck: true
        // });
        window.location.href = authUrl;
    }, [])

    return (
        <></>
    )
}