import MText from "./mText"


export const ScreenTitle = (props: { title: string }) => {
  const { title } = props;
  return (
    <MText style={{ marginTop: 20, marginBottom: 30, fontWeight: '700' }}>{title} </MText>
  )
}