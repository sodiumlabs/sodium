import { useEffect } from "react"
import { IconLogo } from "../../lib/imageDefine";
import { Platform } from "react-native";
import { useCurScreenTab } from "../../lib/data/screen";

export function BaseUIInit() {

  const curScreenName = useCurScreenTab();

  function addFavicon() {
    let link = document.querySelector('link[rel="shortcut icon"]');
    let icon = IconLogo;
    if (link != null) {
      link['href'] = icon.default.src;
      return;
    }
    link = document.createElement('link');
    link['rel'] = 'shortcut icon';
    link['type'] = 'image/png';
    link['href'] = icon.default.src;
    const head = document.querySelector('head');
    head.appendChild(link);
  }

  function setTitle(title: string) {
    document.title = title;
  }

  useEffect(() => {
    if (Platform.OS == "web") {
      addFavicon();
      setTitle("Sodium");
    }
  }, []);

  useEffect(() => {
    if (Platform.OS == "web") {
      setTimeout(() => {
        setTitle("Sodium");
      }, 100);
    }
  }, [curScreenName])
  return <></>
}