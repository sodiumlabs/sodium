import ModalInit from "./modalInit";
import NavigationInit from "./navigationInit";

let _instance = null;

export function SingletonInit(props: { hasNavigationBar?: boolean, hasFloatingBar?: boolean, isNavigationBarBack?: boolean }) {
  // const { hasFloatingBar, hasNavigationBar, isNavigationBarBack } = props;
  // const isAdapterWeb = useAdapterWeb();
  if (_instance == null) {
    _instance = (
      <>
        {/* <Header />
        <Floater />
        <Footer /> */}
        {/* {hasFloatingBar && <Floater isNavigationBarBack={isNavigationBarBack} />} */}
        {/* {hasNavigationBar && (!isAdapterWeb ? <Footer /> : <Header />)} */}

        <ModalInit />
        <NavigationInit />
      </>
    );
  }
  return _instance;
  // return <></>;
}
