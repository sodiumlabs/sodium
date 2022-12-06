import { Select, IndexPath, SelectItem, SelectProps } from "@ui-kitten/components";
import { useRef, useEffect, Dispatch, SetStateAction } from "react";
import { useDimensionSize } from "../../lib/hook/dimension";


export function MSelect(props: SelectProps & { selectIndex: IndexPath; setSelectedIndex: Dispatch<SetStateAction<IndexPath>> }) {
  const { selectIndex, setSelectedIndex: selectedIndex, ...reset } = props;
  const size = useDimensionSize();
  const selectRef = useRef();

  // size change ,hide list
  useEffect(() => {
    if (selectRef) {
      (selectRef.current as Select).blur();
    }
  }, [selectRef, size]);

  return (
    <Select
      ref={selectRef}
      selectedIndex={selectIndex}
      onSelect={(index: IndexPath) => selectedIndex(index)}
      {...reset}>
      {props.children}
    </Select>
  )
}