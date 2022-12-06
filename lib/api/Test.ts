import { useQuery } from "react-query";
import { waitTime } from "../common/common";


export const fetchPost = async (postId: number) => {
  await waitTime(2000);
  console.log(`fetchPost ${postId}`);
  return false;
};


const usePost = (postId: number) => useQuery(['posts', postId], () => fetchPost(postId));
export default usePost;