import { eColor } from "../../lib/globalStyles";
import MText from "../baseUI/mText";


export function CodeItemText(props: { title: string }) {
  return <MText style={{ color: eColor.GrayContentText }}>{props.title}</MText>
}
