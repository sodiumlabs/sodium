




import { ReactNode } from 'react';
import { Image, ViewProps } from 'react-native';
import MHStack from './mHStack';
import MText from './mText';

export default function MLineLR(props: ViewProps & { left: ReactNode, right: ReactNode }) {

  return (
    <MHStack stretchW>
      <MHStack style={{ flex: 1 }}>
        {
          props.left
        }
      </MHStack>
      <MHStack>
        {
          props.right
        }
      </MHStack>


    </MHStack>
  )
}

