import { eColor } from "../../lib/globalStyles";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function MSlider(props: { onSliderValueChange: (progress: number) => void, value: number }) {
  const { onSliderValueChange, value } = props;
  return (
    <Slider
      // onFocus={() => { }}
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
