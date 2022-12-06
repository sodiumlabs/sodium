import { useNavigation as useNavigationOrigin } from '@react-navigation/native';

export const useNavigation = () => {
    return useNavigationOrigin();
}