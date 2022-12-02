




import { ReactNode } from 'react';
import { ViewProps } from 'react-native';
import MHStack from './mHStack';

export default function MLineLR(props: ViewProps & { left: ReactNode, right: ReactNode }) {

  return (
    <MHStack stretchW style={{ 'alignItems': 'center' }}>
      <MHStack style={{ flex: 1, 'alignItems': 'center' }}>
        {
          props.left
        }
      </MHStack>
      <MHStack style={{ 'alignItems': 'center' }}>
        {
          props.right
        }
      </MHStack>

    </MHStack>
  )
}

