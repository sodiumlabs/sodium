
import Avatar from "boring-avatars";
import { ViewProps } from 'react-native';
import MHStack from './mHStack';


export default function MAvatar(props: ViewProps & { name?: string, size?: number }) {
  const { name, size, ...reset } = props;
  return (
    <MHStack {...reset}>
      <Avatar square
        size={size || 24}
        name={name || 'test'}
        variant={'pixel'}
        // colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
        colors={["#40FFDC", "#00A9D4", "#1C3166", "#240047", "#1C0021"]}
      />
    </MHStack>
  )
}

