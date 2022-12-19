import { loginIn } from '../../lib/data/auth';
import { showUpdateFullScreenModal } from '../base/modalInit';
import MButton from '../baseUI/mButton';
import MImage from '../baseUI/mImage';
import MInput from '../baseUI/mInput';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { LoginLoading } from './loginLoading';
import { useState } from 'react';
import { navigation } from '../base/navigationInit';
import { Screens } from '../../lib/define';

export const TwoFactorAuth = (props) => {
  const [isRecovery, setIsRecovery] = useState(false);

  const onAuthVerifyClick = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
    await loginIn("r.albert.huang@gmail.com");
    showUpdateFullScreenModal(false);
  }

  const onRecoveryVerifyClick = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
    await loginIn("r.albert.huang@gmail.com");
    navigation.navigate(Screens.Security);
    showUpdateFullScreenModal(false);
  }

  const onBackClick = () => {
    showUpdateFullScreenModal(false);
  }

  return (
    <MVStack style={{ alignItems: 'center', maxWidth: 300 }}>
      <MImage />
      {
        !isRecovery && (
          <>
            <MText>Two-factor authentication</MText>
            <MVStack style={{ alignItems: 'center', backgroundColor: '#fff', marginVertical: 20 }}>
              <MText>Authentication code </MText>
              <MInput />
              <MButton title={'Verify'} onPress={onAuthVerifyClick} />
              <MText numberOfLines={null}>Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code.</MText>
            </MVStack>
            <MVStack stretchW style={{ backgroundColor: '#fff' }}>
              <MText>Having problems? </MText>
              <MText onPress={() => setIsRecovery(true)}>Use a recovery code or request a reset</MText>
            </MVStack>
            <MButton title='back' onPress={onBackClick} />
          </>
        )
      }
      {
        isRecovery && (
          <>
            <MText>Two-factor recovery</MText>
            <MVStack style={{ alignItems: 'center', backgroundColor: '#fff', marginVertical: 20 }}>
              <MText>Recovery code </MText>
              <MInput />
              <MButton title={'Verify'} onPress={onRecoveryVerifyClick} />
              <MText numberOfLines={null}>If you are unable to access your mobile device, enter one of your recovery codes to verify your identity.</MText>
            </MVStack>
            <MButton title='back' onPress={() => setIsRecovery(false)} />
          </>
        )
      }


    </MVStack>
  )
}