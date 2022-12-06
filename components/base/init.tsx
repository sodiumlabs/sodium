import { useEffect } from "react";
import { Platform } from "react-native";
import { loadLoginDataFromLocal } from "../../src/data/login";


export function Init() {
  useEffect(() => {
    loadLoginDataFromLocal();
    // fetchLoginData();
    console.log(Platform.OS);
  }, [1]);

  return <></>
}