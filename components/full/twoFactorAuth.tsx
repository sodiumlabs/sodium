import { loginIn } from '../../lib/data/auth';
import { showUpdateFullScreenModal } from '../base/modalInit';
import MButton from '../baseUI/mButton';
import MImage from '../baseUI/mImage';
import MInput from '../baseUI/mInput';
import MText from "../baseUI/mText";
import MVStack from "../baseUI/mVStack";
import { LoginLoading } from './loginLoading';

export const TwoFactorAuth = (props) => {
  const onVerifyClick = async () => {
    showUpdateFullScreenModal(true, <LoginLoading />);
    await loginIn("r.albert.huang@gmail.com");
    showUpdateFullScreenModal(false);
  }

  const onBackClick = () => {
    showUpdateFullScreenModal(false);
  }

  return (
    <MVStack style={{ alignItems: 'center', maxWidth: 300 }}>
      <MImage />
      <MText>Two-factor authentication</MText>
      <MVStack style={{ alignItems: 'center', backgroundColor: '#fff', marginVertical: 20 }}>
        <MText>Authentication code </MText>
        <MInput />
        <MButton title={'Verify'} onPress={onVerifyClick} />
        <MText numberOfLines={null}>Open the two-factor authenticator (TOTP) app on your mobile device to view your authentication code.</MText>
      </MVStack>
      <MVStack stretchW style={{ backgroundColor: '#fff' }}>
        <MText>Having problems? </MText>
        <MText>Use a recovery code or request a reset</MText>
      </MVStack>

      <MButton title='back' onPress={onBackClick} />
    </MVStack>
  )
}