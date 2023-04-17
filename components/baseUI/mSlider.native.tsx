
import Slider from '@react-native-community/slider';
import { eColor } from '../../lib/globalStyles';

export default function MSlider(props: { onSliderValueChange: (progress: number) => void, value: number }) {
  const { onSliderValueChange, value } = props;
  return (
    <Slider
      value={value}
      style={{ width: '100%', height: '100%' }}
      minimumValue={0}
      maximumValue={1}
      step={0.01}
      onValueChange={onSliderValueChange}
      minimumTrackTintColor={eColor.Blue}
      maximumTrackTintColor={eColor.Black}
      thumbTintColor={eColor.Blue}
    />
  )

}
