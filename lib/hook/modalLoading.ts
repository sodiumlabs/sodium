import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IModalParam } from "../define";


export function useModalLoading(modalParam: IModalParam): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isLoading, setIsLoading] = useState(false);
  // reset
  useEffect(() => {
    if (!modalParam.visible) {
      setIsLoading(false);
    }
  }, [modalParam.visible])
  return [isLoading, setIsLoading];
}