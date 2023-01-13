import { atom } from "nanostores";
import { ProfileData } from "../define";
import { useStore } from '@nanostores/react';


const profileAtom = atom<ProfileData>({} as ProfileData);

export const useProfile = () => {
  return useStore(profileAtom);
}


export const setProfile = (profile: ProfileData) => {
  profileAtom.set(profile);
}


// export const setAuthorizedSource = (authorizedSource: string) => {
//   profileAtom.set({ ...profileAtom.get(), authorizedSource });
// }



