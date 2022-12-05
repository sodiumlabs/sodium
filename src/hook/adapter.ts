import { fixWidth } from "../define";
import { useDimensionSize } from "./dimension";

export function useAdapterWeb() {
  const dimension = useDimensionSize();
  return dimension[0] > fixWidth;
}