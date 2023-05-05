import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useEffect } from "react";
import { eColor } from "../../lib/globalStyles";

export default function MSlider(props: { onSliderValueChange: (progress: number) => void, value: number }) {
  const { onSliderValueChange, value } = props;
  const removeClassName = () => {
    const nodes = document.getElementsByClassName("rc-slider-handle-dragging");
    if (nodes != null && nodes.length > 0) {
      nodes[0].classList.remove("rc-slider-handle-dragging");
    }
  }
  useEffect(() => {
    removeClassName();
  }, [value]);
  return (
    <Slider style={{ marginTop: 5, marginBottom: 5 }}
      onFocus={() => removeClassName()}
      value={value}
      min={0}
      max={1}
      step={0.01}
      onChange={onSliderValueChange}
      handleStyle={{ background: eColor.Blue, height: 20, width: 20, opacity: 1, top: 1.5, borderColor: eColor.Blue, borderWidth: 0 }}
      trackStyle={{ background: eColor.Blue, }}
      railStyle={{ background: eColor.Black, }}
    />
  )

}
