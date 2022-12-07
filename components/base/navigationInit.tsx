

import { useNavigation } from '../../lib/navigation';
export let navigation = null;
export default function NavigationInit() {
  navigation = useNavigation();
  return (
    <></>
  );
}
