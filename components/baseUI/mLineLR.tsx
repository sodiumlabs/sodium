




import { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import MHStack from './mHStack';

export default function MLineLR(props: ViewProps & { left?: ReactNode, right?: ReactNode }) {
  const { left, right, style, ...reset } = props;
  return (
    <MHStack stretchW style={[{ 'alignItems': 'center' }, style]} {...reset}>
      <MHStack style={{ flex: 1, 'alignItems': 'center' }}>
        {
          left
        }
      </MHStack>
      <MHStack style={{ 'alignItems': 'center' }}>
        {
          right
        }
      </MHStack>

    </MHStack>
  )
}

